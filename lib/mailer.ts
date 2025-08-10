import nodemailer from 'nodemailer';

// Reusable transporter with connection pooling
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true, // use connection pooling
  maxConnections: 5,
  maxMessages: 100
});

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('Mail transport verification failed:', error);
  } else {
    console.log('Mail transport is ready');
  }
});

export default transporter;