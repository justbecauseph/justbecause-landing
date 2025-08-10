export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
  turnstileToken?: string;
}