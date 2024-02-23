import { ImageProcessorConfig } from './ImageConfig';

export default interface IImageStreamProcessor<T> {
  process(input: NodeJS.ReadableStream, config: ImageProcessorConfig): Promise<T> | T;
}
