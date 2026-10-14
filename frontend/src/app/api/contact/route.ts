import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not configured in .env.local");
      return NextResponse.json(
        { success: false, error: "Email service is temporarily unconfigured." },
        { status: 500 }
      );
    }

    // HTML Email Template matching AWS SBG Dark/Emerald branding
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry - AWS Student Builder Group</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e2e8f0;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #111625; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
            
            <!-- Header Banner -->
            <div style="background: linear-gradient(135deg, #0e1526 0%, #064e3b 100%); padding: 32px 36px; border-bottom: 1px solid rgba(0, 230, 118, 0.2);">
              <div style="display: inline-block; padding: 4px 12px; background: rgba(0, 230, 118, 0.12); border: 1px solid rgba(0, 230, 118, 0.3); border-radius: 20px; font-size: 11px; font-weight: 700; color: #00e676; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">
                Portal Inquiry
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                New Message Received
              </h1>
              <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8;">
                AWS Student Builder Group at CHARUSAT
              </p>
            </div>

            <!-- Content Area -->
            <div style="padding: 36px;">
              
              <!-- Topic Badge -->
              <div style="margin-bottom: 24px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Subject / Topic</span>
                <div style="margin-top: 6px; display: inline-block; padding: 6px 14px; background: rgba(0, 230, 118, 0.1); border: 1px solid rgba(0, 230, 118, 0.25); border-radius: 8px; font-size: 14px; font-weight: 700; color: #00e676;">
                  ${subject}
                </div>
              </div>

              <!-- Sender Information Card -->
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; width: 120px; font-weight: 600;">Full Name</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #ffffff; font-weight: 700;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Email Address</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #00e676;"><a href="mailto:${email}" style="color: #00e676; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #64748b; font-weight: 600;">Phone Number</td>
                    <td style="padding: 6px 0; font-size: 14px; color: #f1f5f9; font-weight: 600;">${phone}</td>
                  </tr>
                </table>
              </div>

              <!-- Detailed Message Box -->
              <div style="margin-bottom: 24px;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b;">Message</span>
                <div style="margin-top: 8px; background: #0b0f19; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${message}</div>
              </div>

              <!-- Reply Direct CTA -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)} - AWS SBG CHARUSAT" 
                   style="display: inline-block; background: #00e676; color: #07070a; font-weight: 700; font-size: 13px; padding: 12px 28px; border-radius: 9999px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.08em;">
                  Reply Directly to Sender
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #080c14; padding: 20px 36px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; color: #475569;">
              Dispatched from CHARUSAT AWS Student Builder Group Website
            </div>
          </div>
        </body>
      </html>
    `;

    // Deliver via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AWS SBG Contact <onboarding@resend.dev>",
        to: ["manavmerja074@gmail.com"],
        reply_to: email,
        subject: `[AWS SBG Contact] ${subject} - ${fullName}`,
        html: htmlEmail,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return NextResponse.json(
        { success: false, error: resendData.message || "Failed to dispatch email via Resend." },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json({ success: true, id: resendData.id });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
