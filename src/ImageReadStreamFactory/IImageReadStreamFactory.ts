export default interface IImageReadStreamFactory {
  createReadStream(path: string): NodeJS.ReadableStream;
}
