import { z } from 'zod';

export const ImageFit = z.union([
  z.literal('cover'),
  z.literal('contain'),
  z.literal('fill'),
  z.literal('inside'),
  z.literal('outside'),
]);
export type ImageFit = z.infer<typeof ImageFit>;

export const ImageFiler = z.union([
  z.literal('blur'),
  z.literal('sharpen'),
  z.literal('grayscale'),
  z.literal('sepia'),
  z.literal('pixelate'),
]);
export type ImageFiler = z.infer<typeof ImageFiler>;

export const ImageType = z.union([
  z.literal('jpg'),
  z.literal('avif'),
  z.literal('png'),
  z.literal('webp'),
]);
export type ImageType = z.infer<typeof ImageType>;

export const ImageProcessorConfig = z.object({
  width: z.number().optional(),
  height: z.number().optional(),
  quality: z.number().optional(),
  fit: ImageFit.optional(),
  filter: ImageFiler.optional(),
  allowUpscaling: z.boolean().optional(),
  type: ImageType.optional(),
  debugText: z.string().optional(),
});
export type ImageProcessorConfig = z.infer<typeof ImageProcessorConfig>;
