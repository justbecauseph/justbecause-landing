import nodemailer from 'nodemailer';

// Mock the verify function separately so we can control it
const mockVerify = jest.fn();

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    verify: mockVerify
  }))
}));

describe('mailer module', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    // Reset environment variables
    process.env = {...OLD_ENV};
    // Reset mocks
    (nodemailer.createTransport as jest.Mock).mockClear();
    mockVerify.mockClear();
  });

  afterAll(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });

  it('creates transporter with correct configuration', async () => {
    process.env.SMTP_HOST = 'test-host';
    process.env.SMTP_PORT = '587';
    process.env.SMTP_SECURE = 'true';
    process.env.SMTP_USER = 'user';
    process.env.SMTP_PASS = 'pass';

    // Dynamically import after setting env vars
    // Clear the module cache to ensure fresh import
    jest.resetModules();
    await import('../mailer');
    
    // Access the mock from the mocked module
    const mockedNodemailer = jest.requireMock('nodemailer');
    expect(mockedNodemailer.createTransport).toHaveBeenCalledWith({
      host: 'test-host',
      port: 587,
      secure: true,
      auth: {
        user: 'user',
        pass: 'pass'
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100
    });
  });

  describe('transporter verification', () => {
    let consoleSpy: {
      error: jest.SpyInstance;
      log: jest.SpyInstance;
    };

    beforeEach(async () => {
      // Set default env vars for verification tests
      process.env.SMTP_HOST = 'test-host';
      process.env.SMTP_PORT = '587';
      process.env.SMTP_USER = 'user';
      process.env.SMTP_PASS = 'pass';
      
      consoleSpy = {
        error: jest.spyOn(console, 'error').mockImplementation(),
        log: jest.spyOn(console, 'log').mockImplementation()
      };
      
      // Clear the module cache and import the module
      jest.resetModules();
      await import('../mailer');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    const checkVerifyCall = (resolve: () => void) => {
      if (mockVerify.mock.calls.length > 0) {
        resolve();
      } else {
        setImmediate(() => checkVerifyCall(resolve));
      }
    };

    function waitForVerifyCall() {
      return new Promise<void>(resolve => {
        checkVerifyCall(resolve);
      });
    }

    it('logs success when verification succeeds', async () => {
      // Wait for the verification to be called
      await waitForVerifyCall();
      
      // Simulate successful verification
      const callback = mockVerify.mock.calls[0][0];
      callback(null);
      
      expect(mockVerify).toHaveBeenCalled();
      expect(consoleSpy.error).not.toHaveBeenCalled();
    });

    it('logs error when verification fails', async () => {
      // Wait for the verification to be called
      await waitForVerifyCall();
      
      // Simulate failed verification
      const error = new Error('Connection failed');
      const callback = mockVerify.mock.calls[0][0];
      callback(error);
      
      expect(mockVerify).toHaveBeenCalled();
      expect(consoleSpy.error).toHaveBeenCalledWith(
        'Mail transport verification failed:',
        error
      );
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });
  });
});