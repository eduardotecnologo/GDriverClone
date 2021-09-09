import { logger } from "./logger.js";
import FileHelper  from './fileHelper.js'
import { dirname, resolve} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDownloadsFolder = resolve(__dirname, '../', 'downloads');

export default class Routes{
  io
  constructor(downloadsFolder = defaultDownloadsFolder){
    this.downloadsFolder = downloadsFolder;
    this.fileHelper = FileHelper;
  }
  setSocketInstance(io){
    this.io = io;
  }
  async defaultRoute(request, response){
    response.end('Hello');
  }
   async options(request, response) {
        response.writeHeader(204)
        response.end()
    }
  async post(request, response){
    logger.info('post');
    response.end();
  }
  async get(request, response){
    const files = await this.fileHelper .getFilesStatus(this.downloadsFolder)
    response.writeHeader(200)
    // logger.info('get');
    response.end(JSON.stringify(files));
  }
  handler(request, response){
    response.setHeader('Access-Control-Allow-Origin','*');
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute; //POST,GET.....
    //response.end('hello world');
    return chosen.apply(this, [request, response]);
  }
}