# JustBecause Landing Page

This is the repo for the JustBecause Landing Page.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/justbecause/justbecause-landing.git
```

1. Install dependencies:

```bash
yarn install
```

1. Create environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your email service credentials.

1. Run the development server:

```bash
yarn run dev
```

## Available Scripts

- `yarn run dev`: Start development server with Turbopack
- `yarn run build`: Create production build
- `yarn start`: Start production server
- `yarn run lint`: Check for linting errors

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
```
