import IImageStreamProcessor from './IImageStreamProcessor';
import { ImageProcessorConfig } from './ImageConfig';
import crypto from 'crypto';

export default class EtagProcessor implements IImageStreamProcessor<string> {
  public async process(
    input: NodeJS.ReadableStream,
    config: ImageProcessorConfig,
  ): Promise<string> {
    void config;
    const hash = crypto.createHash('sha256');
    for await (const chunk of input) {
      hash.update(chunk);
    }
    const etag = hash.digest('hex');
    return etag;
  }
}
