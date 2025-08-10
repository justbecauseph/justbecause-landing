import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").trim(),
  email: z.string()
    .min(1, "Email is required")
    .transform(val => val.trim())
    .pipe(z.email("Invalid email address")),
  service: z.string().min(1, "Service is required").max(50, "Invalid selection").trim(),
  message: z.string().min(1, "Message is required").max(500, "Message is too long").trim(),
  turnstileToken: z.any().optional()
});