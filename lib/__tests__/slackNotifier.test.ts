import { afterAll, beforeEach, describe, expect, it, vi, type Mock } from "vite-plus/test";
import { sendSlackNotification } from "../slackNotifier";
import { ContactFormData } from "../types";

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  vi.resetModules();
  process.env = { ...originalEnv };
  (global.fetch as Mock) = vi.fn();
});

afterAll(() => {
  process.env = originalEnv;
});

describe("slackNotifier", () => {
  describe("environment validation", () => {
    it("should exit early if SLACK_WEBHOOK_URL is missing", async () => {
      process.env.SLACK_WEBHOOK_URL = "";

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      await sendSlackNotification({} as ContactFormData);

      expect(consoleSpy).toHaveBeenCalledWith("SLACK_WEBHOOK_URL not configured");
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe("payload formatting", () => {
    beforeEach(() => {
      process.env.SLACK_WEBHOOK_URL = "https://hooks.slack.com/test";
    });

    it("should format the payload correctly", async () => {
      const testData: ContactFormData = {
        name: "Jane Smith",
        email: "jane@example.com",
        service: "Design Consultation",
        message: "Looking for UI/UX help",
      };

      (fetch as Mock).mockResolvedValueOnce({ ok: true });
      await sendSlackNotification(testData);

      const fetchBody = JSON.parse((fetch as Mock).mock.calls[0][1].body);
      const textBlock = fetchBody.blocks[0].text.text;

      expect(textBlock).toContain("📬 *New Contact Form Submission*");
      expect(textBlock).toContain("*Name:* Jane Smith");
      expect(textBlock).toContain("*Email:* jane@example.com");
      expect(textBlock).toContain("*Service:* Design Consultation");
      expect(textBlock).toContain("*Message:* Looking for UI/UX help");
    });

    it("should not escape special characters in Slack messages", async () => {
      const testData: ContactFormData = {
        name: "Test_User*",
        email: "test@example.com",
        service: "Development [Project]",
        message: "Hello (world) with ~special` characters>",
      };

      (fetch as Mock).mockResolvedValueOnce({ ok: true });
      await sendSlackNotification(testData);

      const fetchBody = JSON.parse((fetch as Mock).mock.calls[0][1].body);
      const textBlock = fetchBody.blocks[0].text.text;

      expect(textBlock).toContain("Test_User*");
      expect(textBlock).toContain("Development [Project]");
      expect(textBlock).toContain("Hello (world) with ~special` characters>");
    });
  });

  describe("API request", () => {
    beforeEach(() => {
      process.env.SLACK_WEBHOOK_URL = "https://hooks.slack.com/test";
      (fetch as Mock).mockClear();
    });

    it("should send correct request structure", async () => {
      const testData: ContactFormData = {
        name: "John Doe",
        email: "john@example.com",
        service: "Consulting",
        message: "Hello World",
      };

      (fetch as Mock).mockResolvedValueOnce({ ok: true });

      await sendSlackNotification(testData);

      expect(fetch).toHaveBeenCalledWith(
        "https://hooks.slack.com/test",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    it("should handle HTTP errors", async () => {
      (fetch as Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Invalid webhook",
      });

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      await sendSlackNotification({} as ContactFormData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error sending Slack notification:",
        expect.any(Error),
      );
    });

    it("should handle network errors", async () => {
      (fetch as Mock).mockRejectedValueOnce(new Error("Network error"));

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      await sendSlackNotification({} as ContactFormData);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error sending Slack notification:",
        expect.any(Error),
      );
    });
  });
});
