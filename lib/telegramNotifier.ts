import { ContactFormData } from './types';

export async function sendTelegramNotification(formData: ContactFormData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured');
    return;
  }

  const { name, email, service, message } = formData;
  const text = `📬 *New Contact Form Submission*\n*Name:* ${name}\n*Email:* ${email}\n*Service:* ${service}\n*Message:* ${message}`
    .replace(/_/g, '\\_') // Escape underscores for Markdown
    .replace(/-/g, '\\-') // Escape dashes
    .replace(/\./g, '\\.'); // Escape dots

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