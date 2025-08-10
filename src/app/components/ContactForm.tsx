'use client';

import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Turnstile from 'react-turnstile';
import { FaPaperPlane } from 'react-icons/fa';
import { contactFormSchema } from '../../../lib/validation';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string>('');
  const [turnstileKey, setTurnstileKey] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
      setServerError('');
    }
  };

  const validate = () => {
    // First validate the form fields
    const formResult = contactFormSchema.safeParse(formData);
    if (!formResult.success) {
      const newErrors: Record<string, string> = {};
      formResult.error.issues.forEach(issue => {
        const field = issue.path[0] as string;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
    
    // Then validate the turnstile token
    if (!turnstileToken) {
      console.log('Turnstile token missing');
      setErrors(prev => ({ ...prev, turnstileToken: 'Please complete the CAPTCHA' }));
      return false;
    }
    
    console.log('All validation passed');
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    
    console.log('Validation started');
    const isValid = validate();
    console.log('Validation result:', isValid);
    if (!isValid) return;
    
    if (!turnstileToken) {
      console.log('Turnstile token missing');
      setSubmitStatus('error');
      setServerError('Please complete the CAPTCHA');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setServerError('');
    
    try {
      console.log('Sending request to /api/contact');
      const requestBody = JSON.stringify({
        ...formData,
        turnstileToken
      });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', service: '', message: '' });
        setTurnstileToken(null);
        setServerError('');
        setTurnstileKey(prev => prev + 1);
      } else {
        setSubmitStatus('error');
        setTurnstileToken(null);
      }
    } catch (error: unknown) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setServerError(`Client error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', service: '', message: '' });
    setErrors({});
    setSubmitStatus(null);
    setServerError('');
    setTurnstileToken(null);
    setTurnstileKey(prev => prev + 1);
  };

  return (
    <ErrorBoundary>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
        <button
          type="button"
          onClick={resetForm}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset Form
        </button>
      </div>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {serverError || 'Something went wrong. Please try again later.'}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
            Service of Interest
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`form-input ${errors.service ? 'form-input-error' : ''}`}
          >
            <option value="">Select a service</option>
            <option value="integration">Platform Integration</option>
            <option value="cloud">Cloud Deployment</option>
            <option value="development">Solutions Development</option>
            <option value="consultancy">Consultancy</option>
            <option value="other">Other Inquiries</option>
          </select>
          {errors.service && <p className="error-message">{errors.service}</p>}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`form-input ${errors.message ? 'form-input-error' : ''}`}
          ></textarea>
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>

        <div className="mt-6">
          <Turnstile
            key={turnstileKey}
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            onVerify={setTurnstileToken}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
            theme='light'
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success' || !turnstileToken}
          className="form-button"
          onClick={() => console.log('Submit button clicked')}
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              Send Message <FaPaperPlane className="ml-2" />
            </>
          )}
        </button>
      </form>
      </div>
    </ErrorBoundary>
  );
};

export default ContactForm;