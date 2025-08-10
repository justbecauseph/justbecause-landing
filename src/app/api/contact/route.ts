import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").trim(),
  email: z.email("Invalid email address").trim(),
  service: z.string().min(1, "Service is required").max(50, "Invalid selection").trim(),
  message: z.string().min(1, "Message is required").max(500, "Message is too long").trim(),
  turnstileToken: z.string().min(1, "Turnstile token is required")
});

export async function POST(request: Request) {
  // Parse and validate request body
  const result = contactSchema.safeParse(await request.json());
  
  if (!result.success) {
    const errorMessages = result.error.issues.map(issue => issue.message).join(', ');
    return NextResponse.json(
      { error: `Validation failed: ${errorMessages}` },
      { status: 400 }
    );
  }
  
  const { name, email, service, message, turnstileToken } = result.data;

  // Validate Turnstile token
  const validationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken
    })
  });

  const validationData = await validationResponse.json();
  
  if (!validationData.success) {
    return NextResponse.json(
      { error: 'Invalid Request. Please try again.' },
      { status: 400 }
    );
  }

  try {
    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: `"JustBecause Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch {
    console.error('Error sending email');
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}