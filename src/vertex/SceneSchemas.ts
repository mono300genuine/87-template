import { z } from 'zod';

export const scene1Schema = z.object({
  logo: z.string(),
  audio: z.string(),
  title: z.string(),
  subtitle: z.string(),
  text: z.string(),

});

export const scene2Schema = z.object({
  logo: z.string(),
  img: z.string(),
  audio: z.string(),
});

export const scene3Schema = z.object({
  logo: z.string(),
  img: z.string(),
  audio: z.string(),
});

export const scene4Schema = z.object({
  logo: z.string(),
  img: z.string(),
  audio: z.string(),
});

export const scene5Schema = z.object({
  logo: z.string(),
  img: z.string(),
  audio: z.string(),
});

export const scene6Schema = z.object({
  logo: z.string(),
  audio: z.string(),
});
