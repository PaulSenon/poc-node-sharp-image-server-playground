import { ImageProcessorConfig, ImageType } from '../ImageStreamProcessor/ImageConfig';
import {
  ImageProcessValidParameters,
  TypeAuto,
  TypeMatchSource,
  ValidInputTypes,
} from '../RequestValidator/ImageProcessRequestValidator';
import { Request } from 'express';
import IConfigProcessor from './IConfigProcessor';

export type ImageConfigProcessorInput = {
  config: ImageProcessValidParameters;
  debugText?: string;
  request: Request;
};

export default class ImageConfigProcessor
  implements IConfigProcessor<ImageConfigProcessorInput, ImageProcessorConfig>
{
  process(input: ImageConfigProcessorInput): ImageProcessorConfig {
    return {
      width: input.config.w,
      height: input.config.h,
      fit: input.config.fit,
      type: this.processType(input.request, input.config.type),
      quality: input.config.q,
      debugText: input.debugText,
    };
  }

  private processType(req: Request, type: ValidInputTypes): ImageType | undefined {
    // no specific type requested if we don't want to change the type
    if (type === TypeMatchSource.value) {
      return undefined;
    }
    if (type !== TypeAuto.value) {
      return type;
    }
    switch (req.accepts(['avif', 'webp', 'png', 'jpg'])) {
      case 'avif':
        return 'avif';
      case 'webp':
        return 'webp';
      case 'png':
        return 'png';
      default:
        return 'jpg';
    }
  }
}
