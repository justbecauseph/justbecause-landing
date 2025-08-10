# JustBecause Landing Page

This is the repo for the JustBecause Landing Page.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/justbecause/justbecause-landing.git
```

1. Install dependencies:

```bash
npm install
```

1. Create environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your email service credentials.

1. Run the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Create production build
- `npm start`: Start production server
- `npm run lint`: Check for linting errors

## Project Structure

```plaintext
src/
├── app/               # App router
│   ├── components/    # Reusable components
│   ├── api/           # API routes
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
public/                # Static assets
```

## Environment Variables

Create a `.env.local` file with:

```env
# SMTP Configuration
SMTP_HOST=mail.test.ph
SMTP_PORT=587
SMTP_USER=mailer@test.ph
SMTP_PASS=test
CONTACT_EMAIL=info@test.ph
TURNSTILE_SECRET_KEY=test

# Next.js build settings
NEXT_PUBLIC_SITE_NAME="Site Name"
NEXT_PUBLIC_TURNSTILE_SITE_KEY=test
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXX/XXX/XXXX
TELEGRAM_BOT_TOKEN=XXXX:XXXX
TELEGRAM_CHAT_ID=XXXX
```

### Notification Setup

The application will automatically send notifications to Slack and Telegram when contact form submissions are successfully processed. To enable:

1. For Slack: Create an incoming webhook and set `SLACK_WEBHOOK_URL`
2. For Telegram: Create a bot via @BotFather and set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
