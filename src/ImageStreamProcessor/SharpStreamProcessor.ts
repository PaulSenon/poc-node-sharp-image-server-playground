import sharp from 'sharp';
import IImageStreamProcessor from './IImageStreamProcessor';
import { ImageProcessorConfig } from './ImageConfig';

export type SharpStreamProcessorOutput = {
  buffer: Buffer;
  metadata: {
    format: string;
    size: number;
  };
};
export default class SharpStreamProcessor
  implements IImageStreamProcessor<SharpStreamProcessorOutput>
{
  public async process(
    input: NodeJS.ReadableStream,
    config: ImageProcessorConfig,
  ): Promise<SharpStreamProcessorOutput> {
    const { type, quality, width, height, fit } = config;
    let transformer = sharp();

    if (width || height) {
      transformer = transformer
        .resize(width, height, {
          fit,
          withoutEnlargement: false,
        })
        .sharpen();
    }

    // print debug overlay
    if (config.debugText) {
      const txt = await sharp({
        text: {
          text: `<span foreground="white" background="black">${config.debugText}</span>`,
          width: 100, // max width
          height: 50, // max height
          rgba: true,
        },
      })
        .png()
        .toBuffer();
      transformer = transformer.composite([{ input: txt, gravity: 'southeast' }]);
    }

    // only change format if we have a target type
    if (type) {
      transformer = transformer.toFormat(type, {
        quality,
      });
    }

    const { data, info } = await input.pipe(transformer).toBuffer({ resolveWithObject: true });

    return {
      buffer: data,
      metadata: {
        format: type ?? info.format, // Use the target format if it's not
        size: info.size,
      },
    };
  }
}
