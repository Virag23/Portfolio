import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React frontend can contact this server
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000'
];

if (process.env.CLIENT_URL) {
  try {
    const originUrl = new URL(process.env.CLIENT_URL).origin;
    allowedOrigins.push(originUrl);
    allowedOrigins.push(process.env.CLIENT_URL.replace(/\/$/, ''));
  } catch (e) {
    allowedOrigins.push(process.env.CLIENT_URL.replace(/\/$/, ''));
  }
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowed => 
      allowed.toLowerCase() === origin.toLowerCase()
    );
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Heartbeat route to check system status
app.get('/health', (req, res) => {
  res.json({ status: 'ONLINE', timestamp: new Date() });
});

// Root route to handle health monitors targeting the domain root
app.get('/', (req, res) => {
  res.json({ status: 'ONLINE', message: "Welcome to Virag Nandgaonkar's Portfolio API Server", timestamp: new Date() });
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Simple validation checks
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All transmission parameters (name, email, message) are required.' });
  }

  // Setup Nodemailer Transporter
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const receiverEmail = process.env.RECEIVER_EMAIL || 'viragsjain1975@gmail.com';

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('SMTP Credentials missing from server environment.');
    return res.status(500).json({ error: 'Server mailer setup not fully configured.' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: smtpPort === '465', // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    connectionTimeout: 5000, // 5 seconds
    greetingTimeout: 5000,
    socketTimeout: 5000
  });

  // 1. Beautiful Cyber HTML layout for Admin Email (to Virag)
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #030014; color: #e4e4e7; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 20px auto; background: #08051e; border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; overflow: hidden; box-shadow: 0 0 30px rgba(139, 92, 246, 0.15); }
        .header { background: linear-gradient(90deg, #ff007f, #8b5cf6); padding: 30px 20px; text-align: center; }
        .header h2 { margin: 0; font-size: 24px; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; font-family: sans-serif; text-shadow: 0 0 10px rgba(255, 0, 127, 0.5); }
        .content { padding: 30px 25px; }
        .field { margin-bottom: 25px; }
        .label { font-size: 11px; text-transform: uppercase; color: #ff007f; font-weight: bold; letter-spacing: 2px; margin-bottom: 8px; display: block; }
        .value { font-size: 15px; color: #ffffff; background: #030014; padding: 12px 15px; border-radius: 6px; border-left: 3px solid #00f0ff; font-family: monospace; }
        .footer { background: #030014; text-align: center; padding: 20px; font-size: 11px; color: #71717a; border-top: 1px solid rgba(139, 92, 246, 0.1); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>NEW TRANSACTION PACKET</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Sender Identity</span>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <span class="label">Communication Address</span>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <span class="label">Message Payload</span>
            <div class="value" style="white-space: pre-wrap; line-height: 1.5;">${message}</div>
          </div>
        </div>
        <div class="footer">
          Virag Nandgaonkar Core Dev Registry • Secured Node Port
        </div>
      </div>
    </body>
    </html>
  `;

  // 2. Beautiful Cyber HTML layout for Client Email (Thank-you confirmation to sender)
  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #030014; color: #e4e4e7; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 20px auto; background: #08051e; border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 12px; overflow: hidden; box-shadow: 0 0 30px rgba(0, 240, 255, 0.15); }
        .header { background: linear-gradient(90deg, #00f0ff, #8b5cf6); padding: 30px 20px; text-align: center; }
        .header h2 { margin: 0; font-size: 22px; letter-spacing: 2px; color: #030014; text-transform: uppercase; font-weight: bold; }
        .content { padding: 35px 30px; text-align: left; }
        .greeting { font-size: 18px; font-weight: bold; color: #00f0ff; margin-bottom: 20px; }
        .content p { font-size: 15px; color: #a1a1aa; line-height: 1.6; margin-bottom: 20px; }
        .footer { background: #030014; text-align: center; padding: 20px; font-size: 11px; color: #71717a; border-top: 1px solid rgba(0, 240, 255, 0.1); }
        .btn { display: inline-block; padding: 12px 25px; background: #00f0ff; color: #030014; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 15px; text-align: center; font-size: 14px; box-shadow: 0 0 10px rgba(0, 240, 255, 0.3); }
        .btn:hover { background: #ff007f; color: #ffffff; box-shadow: 0 0 15px rgba(255, 0, 127, 0.5); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>CONNECTION ACKNOWLEDGED</h2>
        </div>
        <div class="content">
          <div class="greeting">Hello ${name},</div>
          <p>Thank you for reaching out! I have successfully received your contact form payload in my development server.</p>
          <p>I am excited to connect with you and will review your message shortly. I will write back to you as soon as possible.</p>
          <p>In the meantime, feel free to inspect my open-source projects or review my professional repositories on GitHub.</p>
          <div style="text-align: center; margin-top: 25px;">
            <a href="https://github.com/Virag23" class="btn" target="_blank">Explore GitHub Code</a>
          </div>
        </div>
        <div class="footer">
          Sent automatically by Virag Nandgaonkar's Dev Server Node
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send email to Virag (Notification)
    await transporter.sendMail({
      from: `"${name} (Portfolio)" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `📧 Portfolio Message from ${name}`,
      html: adminHtml
    });

    // Send thank-you auto-responder to the sender
    await transporter.sendMail({
      from: `"Virag Nandgaonkar" <${smtpUser}>`,
      to: email,
      subject: `✔ Connection Acknowledged - Virag Nandgaonkar`,
      html: clientHtml
    });

    console.log(`Email transmissions succeeded from: ${email}`);
    res.json({ success: true, message: 'Message sent and auto-reply delivered successfully!' });
  } catch (error) {
    console.error('Nodemailer transmission failure:', error);
    res.status(500).json({ error: 'Mail transmission link failed. Please check server logs.' });
  }
});

app.listen(PORT, () => {
  console.log(`[NODE SERVER] Online on port ${PORT}`);
});
