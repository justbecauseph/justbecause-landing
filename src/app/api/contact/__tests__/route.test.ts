import { POST } from '../route';
import { contactFormSchema } from '../../../../../lib/validation';
import transporter from '../../../../../lib/mailer';
import { sendSlackNotification } from '../../../../../lib/slackNotifier';
import { sendTelegramNotification } from '../../../../../lib/telegramNotifier';

// Mock entire modules
jest.mock('../../../../../lib/validation', () => ({
  contactFormSchema: {
    safeParse: jest.fn()
  }
}));

jest.mock('../../../../../lib/mailer', () => ({
  __esModule: true,
  default: {
    sendMail: jest.fn()
  }
}));

jest.mock('../../../../../lib/slackNotifier', () => ({
  sendSlackNotification: jest.fn()
}));

jest.mock('../../../../../lib/telegramNotifier', () => ({
  sendTelegramNotification: jest.fn()
}));

// Mock global fetch
global.fetch = jest.fn() as jest.Mock;

describe('POST /api/contact', () => {
  const mockRequest = (data: unknown) =>
    new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    service: 'Consulting',
    message: 'Hello, I need help with a project',
    turnstileToken: 'valid_token'
  };

  beforeEach(() => {
    jest.resetAllMocks();
    process.env.TURNSTILE_SECRET_KEY = 'test_secret';
    process.env.SMTP_USER = 'noreply@example.com';
    process.env.CONTACT_EMAIL = 'contact@example.com';
  });

  it('should return 400 for validation errors', async () => {
    // Mock validation failure
    (contactFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: false,
      error: {
        issues: [{ message: 'Name is required' }, { message: 'Invalid email' }]
      }
    });

    const response = await POST(mockRequest({}));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed: Name is required, Invalid email');
  });

  it('should return 400 for invalid Turnstile token', async () => {
    // Mock validation success
    (contactFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: validData
    });

    // Mock Turnstile failure
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: false })
    });

    const response = await POST(mockRequest(validData));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid Request. Please try again.');
  });

  it('should send email and notifications on success', async () => {
    // Mock validation success
    (contactFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: validData
    });

    // Mock Turnstile success
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true })
    });

    // Mock email success
    (transporter.sendMail as jest.Mock).mockResolvedValueOnce({});

    // Mock notification successes
    (sendSlackNotification as jest.Mock).mockResolvedValueOnce(undefined);
    (sendTelegramNotification as jest.Mock).mockResolvedValueOnce(undefined);

    const response = await POST(mockRequest(validData));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Message sent successfully');
    expect(transporter.sendMail).toHaveBeenCalled();
    expect(sendSlackNotification).toHaveBeenCalledWith(validData);
    expect(sendTelegramNotification).toHaveBeenCalledWith(validData);
  });

  it('should handle email sending failure', async () => {
    // Mock validation success
    (contactFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: validData
    });

    // Mock Turnstile success
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true })
    });

    // Mock email failure
    const emailError = new Error('SMTP connection failed');
    (transporter.sendMail as jest.Mock).mockRejectedValueOnce(emailError);

    // Suppress console.error for this test to avoid cluttering output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const response = await POST(mockRequest(validData));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain('Failed to send message: SMTP connection failed');
    
    // Restore console.error
    consoleSpy.mockRestore();
  });

  it('should succeed even if notifications partially fail', async () => {
    // Mock validation success
    (contactFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: validData
    });

    // Mock Turnstile success
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true })
    });

    // Mock email success
    (transporter.sendMail as jest.Mock).mockResolvedValueOnce({});

    // Mock partial notification failures
    (sendSlackNotification as jest.Mock).mockRejectedValueOnce(new Error('Slack failed'));
    (sendTelegramNotification as jest.Mock).mockResolvedValueOnce(undefined);

    const response = await POST(mockRequest(validData));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Message sent successfully');
  });

  it('should use SMTP_USER as fallback contact email', async () => {
    delete process.env.CONTACT_EMAIL;
    
    // Mock validation success
    (contactFormSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: validData
    });

    // Mock Turnstile success
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true })
    });

    // Mock email success
    (transporter.sendMail as jest.Mock).mockResolvedValueOnce({});

    await POST(mockRequest(validData));

    const mailOptions = (transporter.sendMail as jest.Mock).mock.calls[0][0];
    expect(mailOptions.to).toBe('noreply@example.com');
  });
});