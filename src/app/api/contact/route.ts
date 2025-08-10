import { NextResponse } from 'next/server';
import transporter from '../../../../lib/mailer';
import { contactFormSchema } from '../../../../lib/validation';

export async function POST(request: Request) {
  // Parse and validate request body
  const result = contactFormSchema.safeParse(await request.json());
  
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

    // Send email using reusable transport
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to send message: ${errorMessage}` },
      { status: 500 }
    );
  }
}