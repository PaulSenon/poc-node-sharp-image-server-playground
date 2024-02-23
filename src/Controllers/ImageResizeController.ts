import path from 'path';
import IConfigProcessor from '../ConfigProcessor/IConfigProcessor';
import { ImageConfigProcessorInput } from '../ConfigProcessor/ImageConfigProcessor';
import IImageReadStreamFactory from '../ImageReadStreamFactory/IImageReadStreamFactory';
import IImageStreamProcessor from '../ImageStreamProcessor/IImageStreamProcessor';
import { ImageProcessorConfig } from '../ImageStreamProcessor/ImageConfig';
import IRequestValidator from '../RequestValidator/IRequestValidator';
import { ImageProcessValidParameters } from '../RequestValidator/ImageProcessRequestValidator';
import IController from './IController';
import { Request, Response } from 'express';
import { SharpStreamProcessorOutput } from '../ImageStreamProcessor/SharpStreamProcessor';

export default class ImageResizeController implements IController {
  // private start = Date.now();
  private count = 0;
  constructor(
    private readonly requestValidator: IRequestValidator<ImageProcessValidParameters>,
    private readonly imageConfigProcessor: IConfigProcessor<
      ImageConfigProcessorInput,
      ImageProcessorConfig
    >,
    private readonly imageReadStreamFactory: IImageReadStreamFactory,
    private readonly imageStreamProcessor: IImageStreamProcessor<SharpStreamProcessorOutput>,
    private readonly etagStreamProcessor: IImageStreamProcessor<string>,
  ) {}

  public async processRequest(request: Request, response: Response): Promise<void> {
    this.count += 1;
    try {
      const validConfig = this.requestValidator.validate(request);
      console.log(validConfig);
      const filePath = path.join('./images', validConfig.src);

      const streamForEtag = this.imageReadStreamFactory.createReadStream(filePath);

      const config = this.imageConfigProcessor.process({
        config: validConfig,
        request,
        debugText: this.count.toString(),
      });
      console.log(config);

      // await etag first
      const etag = await this.etagStreamProcessor.process(streamForEtag, config);
      console.log(etag);
      if (request.headers['if-none-match'] === etag) {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('NOT MODIFIED');
        response.status(304).send('Not Modified');
        console.log('END (with 304)');
        console.log('');
        return;
      }

      // await image if etag was not matching
      const streamForImage = this.imageReadStreamFactory.createReadStream(filePath);
      const { buffer, metadata } = await this.imageStreamProcessor.process(streamForImage, config);
      console.log(metadata);

      response.setHeader('Content-Type', `image/${metadata.format}`);
      response.setHeader(
        'Cache-Control',
        'public, max-age=10, stale-while-revalidate=60, stale-if-error=3600',
      );
      response.setHeader('Content-Length', metadata.size.toString());
      response.setHeader('ETag', etag);
      response.status(200).send(buffer);
      console.log('END (with 200)');
      console.log('');
    } catch (error) {
      console.error(error);
      response.setHeader('Content-Type', 'text/plain');
      response.status(500).send('error');
    }
  }
}
