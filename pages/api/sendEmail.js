const nodemailer = require('nodemailer');

const senderEmail = 'noreply@zicops.com';

export default function sendEmail(req, res) {
  const { recipient, subject, message } = req.body;
  if (req?.method !== 'POST') return res.status(400).json({ name: 'Only POST is supported' });

  if (!recipient) return res.status(400).json({ name: 'Recipient is required' });
  if (!subject) return res.status(400).json({ name: 'Subject is required' });
  if (!message) return res.status(400).json({ name: 'Message is required' });

  let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: process.env.GMAIL_PASSWORD
      //rjzhqtwxevqqhukj
    }
  });
  let mailOptions = { from: senderEmail, to: recipient, subject: subject, text: message };

  transport.sendMail(mailOptions, function (err, info) {
    res.json(!!err ? { 'Error: ': err } : { 'Success: ': info.response });
  });

  // res.status(200).json({ msg: 'Email Send' });
  return;
}
