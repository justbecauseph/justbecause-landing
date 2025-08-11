import { sendTelegramNotification } from '../telegramNotifier';
import { ContactFormData } from '../types';

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

// Mock fetch
global.fetch = jest.fn();

describe('telegramNotifier', () => {
  describe('environment validation', () => {
    it('should exit early if TELEGRAM_BOT_TOKEN is missing', async () => {
      process.env.TELEGRAM_BOT_TOKEN = '';
      process.env.TELEGRAM_CHAT_ID = '12345';
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      await sendTelegramNotification({} as ContactFormData);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured'
      );
    });

    it('should exit early if TELEGRAM_CHAT_ID is missing', async () => {
      process.env.TELEGRAM_BOT_TOKEN = 'test_token';
      process.env.TELEGRAM_CHAT_ID = '';
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      await sendTelegramNotification({} as ContactFormData);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured'
      );
    });
  });

  describe('Markdown escaping', () => {
    it('should escape MarkdownV2 special characters', async () => {
      process.env.TELEGRAM_BOT_TOKEN = 'test_token';
      process.env.TELEGRAM_CHAT_ID = '12345';
      
      const testData: ContactFormData = {
        name: 'Test_User*',
        email: 'test@example.com',
        service: 'Development [Project]',
        message: 'Hello (world) with ~special` characters>'
      };

      await sendTelegramNotification(testData);
      
      const fetchBody = JSON.parse((fetch as jest.Mock).mock.calls[0][1].body);
      expect(fetchBody.text).toContain('Test\\_User\\*');
      expect(fetchBody.text).toContain('Development \\[Project\\]');
      expect(fetchBody.text).toContain('Hello \\(world\\) with \\~special\\` characters\\>');
    });
  });

  describe('API request', () => {
    beforeEach(() => {
      process.env.TELEGRAM_BOT_TOKEN = 'test_token';
      process.env.TELEGRAM_CHAT_ID = '12345';
      (fetch as jest.Mock).mockClear();
    });

    it('should send correct request structure', async () => {
      const testData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        service: 'Consulting',
        message: 'Hello World'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

      await sendTelegramNotification(testData);

      expect(fetch).toHaveBeenCalledWith(
        'https://api.telegram.org/bottest_token/sendMessage',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"parse_mode":"MarkdownV2"')
        })
      );
    });

    it('should handle HTTP errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Invalid token'
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      await sendTelegramNotification({} as ContactFormData);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error sending Telegram notification:',
        expect.any(Error)
      );
    });

    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      await sendTelegramNotification({} as ContactFormData);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error sending Telegram notification:',
        expect.any(Error)
      );
    });
  });
});