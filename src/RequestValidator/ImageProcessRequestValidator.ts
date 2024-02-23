import z from 'zod';
import { ImageFit, ImageType } from '../ImageStreamProcessor/ImageConfig';
import { Request } from 'express';
import IRequestValidator from './IRequestValidator';

export const TypeAuto = z.literal('auto');
export const TypeMatchSource = z.literal('matchSource');
export const ValidInputTypes = z.union([ImageType, TypeAuto, TypeMatchSource]);
export type ValidInputTypes = z.infer<typeof ValidInputTypes>;

export const ValidInputFit = ImageFit;

function isNumberString(value: string): boolean {
  return !isNaN(parseInt(value, 10));
}

export const ImageProcessValidParameters = z.object({
  src: z.string(),
  w: z
    .string()
    .optional()
    .refine((v) => !v || isNumberString(v), { message: 'w must be a number' })
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
  h: z
    .string()
    .optional()
    .refine((v) => !v || isNumberString(v), { message: 'h must be a number' })
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
  fit: ValidInputFit.optional(),
  type: ValidInputTypes.optional().default(TypeAuto.value),
  q: z
    .string()
    .optional()
    .default('75')
    .refine((v) => !v || isNumberString(v), { message: 'q must be a number' })
    .refine((v) => !v || (parseInt(v, 10) >= 0 && parseInt(v, 10) <= 100), {
      message: 'q must be a number between 0 and 100',
    })
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
});
export type ImageProcessValidParameters = z.infer<typeof ImageProcessValidParameters>;

export default class ImageProcessRequestValidator
  implements IRequestValidator<ImageProcessValidParameters>
{
  public validate(request: Request): ImageProcessValidParameters {
    const result = ImageProcessValidParameters.safeParse(request.query);
    if (!result.success) {
      console.error(result.error.errors);
      throw new Error(result.error.errors[0].message);
    }

    return result.data;
  }
}
