import { beforeEach, describe, expect, it, vi, type Mock } from "vite-plus/test";
import { POST } from "../route";
import { contactFormSchema } from "../../../../../lib/validation";
import { sendSlackNotification } from "../../../../../lib/slackNotifier";
import { sendTelegramNotification } from "../../../../../lib/telegramNotifier";

const { mockSendMail } = vi.hoisted(() => ({
  mockSendMail: vi.fn(),
}));

// Mock entire modules
vi.mock("../../../../../lib/validation", () => ({
  contactFormSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock("../../../../../lib/mailer", () => ({
  default: {
    sendMail: mockSendMail,
  },
}));

vi.mock("../../../../../lib/slackNotifier", () => ({
  sendSlackNotification: vi.fn(),
}));

vi.mock("../../../../../lib/telegramNotifier", () => ({
  sendTelegramNotification: vi.fn(),
}));

// Mock global fetch
global.fetch = vi.fn() as Mock;

describe("POST /api/contact", () => {
  const mockRequest = (data: unknown) =>
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

  const validData = {
    name: "John Doe",
    email: "john@example.com",
    service: "Consulting",
    message: "Hello, I need help with a project",
    turnstileToken: "valid_token",
  };

  beforeEach(() => {
    vi.resetAllMocks();
    process.env.TURNSTILE_SECRET_KEY = "test_secret";
    process.env.SMTP_USER = "noreply@example.com";
    process.env.CONTACT_EMAIL = "contact@example.com";
  });

  it("should return 400 for validation errors", async () => {
    (contactFormSchema.safeParse as Mock).mockReturnValueOnce({
      success: false,
      error: {
        issues: [{ message: "Name is required" }, { message: "Invalid email" }],
      },
    });

    const response = await POST(mockRequest({}));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain("Validation failed: Name is required, Invalid email");
  });

  it("should send email and notifications on success", async () => {
    (contactFormSchema.safeParse as Mock).mockReturnValueOnce({
      success: true,
      data: validData,
    });

    (fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    mockSendMail.mockResolvedValueOnce({});

    (sendSlackNotification as Mock).mockResolvedValueOnce(undefined);
    (sendTelegramNotification as Mock).mockResolvedValueOnce(undefined);

    const response = await POST(mockRequest(validData));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Message sent successfully");
    expect(mockSendMail).toHaveBeenCalled();
    expect(sendSlackNotification).toHaveBeenCalledWith(validData);
    expect(sendTelegramNotification).toHaveBeenCalledWith(validData);
  });

  it("should handle email sending failure", async () => {
    (contactFormSchema.safeParse as Mock).mockReturnValueOnce({
      success: true,
      data: validData,
    });

    (fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    const emailError = new Error("SMTP connection failed");
    mockSendMail.mockRejectedValueOnce(emailError);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(mockRequest(validData));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain("Failed to send message: SMTP connection failed");

    consoleSpy.mockRestore();
  });

  it("should succeed even if notifications partially fail", async () => {
    (contactFormSchema.safeParse as Mock).mockReturnValueOnce({
      success: true,
      data: validData,
    });

    (fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    mockSendMail.mockResolvedValueOnce({});

    (sendSlackNotification as Mock).mockRejectedValueOnce(new Error("Slack failed"));
    (sendTelegramNotification as Mock).mockResolvedValueOnce(undefined);

    const response = await POST(mockRequest(validData));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe("Message sent successfully");
  });

  it("should use SMTP_USER as fallback contact email", async () => {
    delete process.env.CONTACT_EMAIL;

    (contactFormSchema.safeParse as Mock).mockReturnValueOnce({
      success: true,
      data: validData,
    });

    (fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    mockSendMail.mockResolvedValueOnce({});

    await POST(mockRequest(validData));

    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.to).toBe("noreply@example.com");
  });

  it("should properly escape HTML characters in email body", async () => {
    const xssData = {
      ...validData,
      name: 'Jane <script>alert("xss")</script> & Co',
      message: "Budget > $10k & \"urgent\" 'request'",
    };

    (contactFormSchema.safeParse as Mock).mockReturnValueOnce({
      success: true,
      data: xssData,
    });

    (fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    mockSendMail.mockResolvedValueOnce({});

    const response = await POST(mockRequest(xssData));
    expect(response.status).toBe(200);

    const mailOptions = mockSendMail.mock.calls[0][0];
    expect(mailOptions.html).toContain(
      "Jane &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; Co",
    );
    expect(mailOptions.html).toContain(
      "Budget &gt; $10k &amp; &quot;urgent&quot; &#039;request&#039;",
    );
  });
});
