import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vite-plus/test";
import nodemailer from "nodemailer";

const { mockVerify, mockCreateTransport } = vi.hoisted(() => {
  const verify = vi.fn();
  const createTransport = vi.fn(() => ({
    verify,
  }));
  return { mockVerify: verify, mockCreateTransport: createTransport };
});

vi.mock("nodemailer", () => ({
  default: {
    createTransport: mockCreateTransport,
  },
  createTransport: mockCreateTransport,
}));

describe("mailer module", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
    mockCreateTransport.mockClear();
    mockVerify.mockClear();
  });

  afterAll(() => {
    process.env = OLD_ENV;
    vi.restoreAllMocks();
  });

  it("creates transporter with correct configuration", async () => {
    process.env.SMTP_HOST = "test-host";
    process.env.SMTP_PORT = "587";
    process.env.SMTP_SECURE = "true";
    process.env.SMTP_USER = "user";
    process.env.SMTP_PASS = "pass";

    vi.resetModules();
    await import("../mailer");

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "test-host",
      port: 587,
      secure: true,
      auth: {
        user: "user",
        pass: "pass",
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });
  });

  describe("transporter verification", () => {
    let consoleSpy: {
      error: MockInstance;
      log: MockInstance;
    };

    beforeEach(async () => {
      process.env.SMTP_HOST = "test-host";
      process.env.SMTP_PORT = "587";
      process.env.SMTP_USER = "user";
      process.env.SMTP_PASS = "pass";

      consoleSpy = {
        error: vi.spyOn(console, "error").mockImplementation(() => {}),
        log: vi.spyOn(console, "log").mockImplementation(() => {}),
      };

      vi.resetModules();
      await import("../mailer");
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    const checkVerifyCall = (resolve: () => void) => {
      if (mockVerify.mock.calls.length > 0) {
        resolve();
      } else {
        setImmediate(() => checkVerifyCall(resolve));
      }
    };

    function waitForVerifyCall() {
      return new Promise<void>((resolve) => {
        checkVerifyCall(resolve);
      });
    }

    it("logs success when verification succeeds", async () => {
      await waitForVerifyCall();

      const callback = mockVerify.mock.calls[0][0];
      callback(null);

      expect(mockVerify).toHaveBeenCalled();
      expect(consoleSpy.error).not.toHaveBeenCalled();
    });

    it("logs error when verification fails", async () => {
      await waitForVerifyCall();

      const error = new Error("Connection failed");
      const callback = mockVerify.mock.calls[0][0];
      callback(error);

      expect(mockVerify).toHaveBeenCalled();
      expect(consoleSpy.error).toHaveBeenCalledWith("Mail transport verification failed:", error);
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });
  });
});
