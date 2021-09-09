import fs from 'fs';
import prettyBytes from 'pretty-bytes';

export default class FileHelper{
  static async getFilesStatus(downloadsFolder){
    const currentFiles = await fs.promises.readdir(downloadsFolder);
    const statuses =  await Promise.all(currentFiles
                                   .map(file => fs.promises
                                   .stat(`${downloadsFolder}/${file}`)))
                 //console.log({statuses})
                 const filesStatuses = []
                 for(const fileIndex in currentFiles){
                    const { birthtime, size} = statuses[fileIndex]
                    // console.log({birthtime, size:prettyBytes(size)})size: '130 kB'
                    filesStatuses.push({
                      size: prettyBytes(size),
                      file: currentFiles[fileIndex],
                      lastModified: birthtime,
                      owner: process.env.USER
                    })
                 }

                 return filesStatuses
  }
}