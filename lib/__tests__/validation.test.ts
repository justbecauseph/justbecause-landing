import { contactFormSchema } from '../validation';
import { ContactFormData } from '../types';

describe('contactFormSchema', () => {
  const validData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    service: 'Consulting',
    message: 'Hello, I need help with a project',
    turnstileToken: 'test_token'
  };

  describe('name validation', () => {
    it('should require name', () => {
      const result = contactFormSchema.safeParse({ ...validData, name: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name is required');
      }
    });

    it('should reject names longer than 100 characters', () => {
      const longName = 'a'.repeat(101);
      const result = contactFormSchema.safeParse({ ...validData, name: longName });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Name is too long');
      }
    });

    it('should trim whitespace', () => {
      const result = contactFormSchema.parse({ ...validData, name: '  John Doe  ' });
      expect(result.name).toBe('John Doe');
    });
  });

  describe('email validation', () => {
    it('should require email', () => {
      const result = contactFormSchema.safeParse({ ...validData, email: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Email is required');
      }
    });

    it('should reject invalid email formats', () => {
      const result = contactFormSchema.safeParse({ ...validData, email: 'invalid-email' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });

    it('should trim whitespace', () => {
      const result = contactFormSchema.safeParse({ ...validData, email: '  john@example.com  ' });
      
      // Should be successful since we're trimming before validation
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('john@example.com');
      }
    });

    it('should reject invalid email format', () => {
      const result = contactFormSchema.safeParse({ ...validData, email: 'invalid-email' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });
  });

  describe('service validation', () => {
    it('should require service', () => {
      const result = contactFormSchema.safeParse({ ...validData, service: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Service is required');
      }
    });

    it('should reject services longer than 50 characters', () => {
      const longService = 'a'.repeat(51);
      const result = contactFormSchema.safeParse({ ...validData, service: longService });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid selection');
      }
    });

    it('should trim whitespace', () => {
      const result = contactFormSchema.parse({ ...validData, service: '  Consulting  ' });
      expect(result.service).toBe('Consulting');
    });
  });

  describe('message validation', () => {
    it('should require message', () => {
      const result = contactFormSchema.safeParse({ ...validData, message: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Message is required');
      }
    });

    it('should reject messages longer than 500 characters', () => {
      const longMessage = 'a'.repeat(501);
      const result = contactFormSchema.safeParse({ ...validData, message: longMessage });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Message is too long');
      }
    });

    it('should trim whitespace', () => {
      const result = contactFormSchema.parse({ ...validData, message: '  Hello World  ' });
      expect(result.message).toBe('Hello World');
    });
  });

  describe('turnstileToken', () => {
    it('should be optional', () => {
      const withoutToken = { ...validData };
      delete withoutToken.turnstileToken;
      const result = contactFormSchema.safeParse(withoutToken);
      expect(result.success).toBe(true);
    });

    it('should accept any value', () => {
      const result = contactFormSchema.safeParse({ ...validData, turnstileToken: 123 });
      expect(result.success).toBe(true);
    });
  });
});