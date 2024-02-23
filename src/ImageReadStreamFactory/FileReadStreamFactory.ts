import IImageReadStreamFactory from './IImageReadStreamFactory';
import fs from 'fs';

export default class FileReadStreamFactory implements IImageReadStreamFactory {
  public createReadStream(path: string): NodeJS.ReadableStream {
    const stream = fs.createReadStream(path);
    return stream;
  }
}
