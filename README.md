# JustBecause Landing Page

This is the repo for the JustBecause Landing Page.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/justbecause/justbecause-landing.git
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your local environment overrides.

Run the development server:

```bash
npm run dev
```

Run the tests:

```bash
npm test
```

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Create production build
- `npm start`: Start production server
- `npm run lint`: Check for linting errors
- `npm test`: Run all Jest tests

## Project Structure

```plaintext
.
├── .github/                      # GitHub configuration
│   └── workflows/
│       └── ci.yaml               # CI workflow
├── lib/                          # Utility modules
│   ├── mailer.ts                 # Email sending module
│   ├── slackNotifier.ts          # Slack notification module
│   ├── telegramNotifier.ts       # Telegram notification module
│   ├── types.ts                  # TypeScript type definitions
│   ├── validation.ts             # Validation utilities
│   └── __tests__/                # Tests for utility modules
├── public/                       # Static assets
│   ├── _headers
│   ├── digitalocean.svg
│   ├── file.svg
│   ├── gcp.png
│   ├── globe.svg
│   ├── justbecauseph.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── src/
    └── app/                      # Next.js app router
        ├── api/                  # API routes
        │   └── contact/
        │       ├── route.ts      # Contact form API route
        │       └── __tests__/    # Tests for API route
        ├── components/           # Reusable components
        │   ├── ContactForm.tsx   # Contact form component
        │   ├── ErrorBoundary.tsx
        │   ├── Footer.tsx
        │   ├── Header.tsx
        │   ├── ScrollButton.tsx
        │   └── ServiceCard.tsx
        ├── favicon.ico
        ├── globals.css           # Global styles
        ├── layout.tsx            # Root layout
        ├── page.tsx              # Home page
        ├── robots.ts             # Robots.txt configuration
        └── sitemap.ts            # Sitemap configuration
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

# Notification Configuration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXX/XXX/XXXX
TELEGRAM_BOT_TOKEN=XXXX:XXXX
TELEGRAM_CHAT_ID=XXXX

# Next.js build settings
NEXT_PUBLIC_SITE_NAME="Site Name"
NEXT_PUBLIC_TURNSTILE_SITE_KEY=test
```

### Notification Setup

The application will automatically send notifications to Slack and Telegram when contact form submissions are successfully processed. To enable:

1. For Slack: Create an incoming webhook and set `SLACK_WEBHOOK_URL`
2. For Telegram: Create a bot via @BotFather and set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
