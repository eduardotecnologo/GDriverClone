// import { read } from 'fs';
import { Readable, Writable, Transform } from 'stream';
export default class TestUtil{
  static generateReadableStream(data){
    return new Readable({
      objectMode: true,
       read(){
        for (const item of data){
        this.push(data)
        }
      this.push(null)
      }
    })
  }
  static generateReadableStream(onData){
    return new Writable({
      objectMode: true,
      write(chunk, encoding, cb){
        onData(chunk)
        cb(null, chunk)
      }
    });
  }
  static generateTransformStream(onData){
    return new Transform({
      objectMode: true,
      transform(chunk, enconding, cb){
        onData(chunk)
        cb(null, chunk)
      }
    })
  }
}