import { ContactFormData } from './types';

// Helper function to escape all MarkdownV2 special characters
function escapeMarkdownV2(text: string | null | undefined): string {
  if (typeof text !== 'string') return '';
  
  // List of characters to escape in MarkdownV2
  // See: https://core.telegram.org/bots/api#markdownv2-style
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

export async function sendTelegramNotification(formData: ContactFormData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured');
    return;
  }

  const { name, email, service, message } = formData;
  const safeName = escapeMarkdownV2(name);
  const safeEmail = escapeMarkdownV2(email);
  const safeService = escapeMarkdownV2(service);
  const safeMessage = escapeMarkdownV2(message);
  const text = `📬 *New Contact Form Submission*\n*Name:* ${safeName}\n*Email:* ${safeEmail}\n*Service:* ${safeService}\n*Message:* ${safeMessage}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'MarkdownV2'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Telegram notification failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}