// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = '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';
const SENDER_EMAIL = 'noreply@zicops.com';

export default function sendEmail(req, res) {
  const { recipient, subject, message, htmlMsg } = req.body;
  if (req?.method !== 'POST') return res.status(400).json({ error: 'Only POST is supported' });

  if (!recipient) return res.status(400).json({ error: 'Recipient is required' });
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const msg = {
    to: recipient, // Change to your recipient
    from: SENDER_EMAIL, // Change to your verified sender
    subject: subject || 'Zicops',
    text: message
  };

  if (htmlMsg) msg.html = htmlMsg;

  sgMail.setApiKey(SENDGRID_API_KEY);

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.send('Email Send Successfully');
    })
    .catch((error) => {
      console.error(error);
      res.send({ 'Error: ': err });
    });
  return;
}

// const nodemailer = require('nodemailer');

// const senderEmail = 'noreply@zicops.com';

// export default function sendEmail(req, res) {
//   const { recipient, subject, message } = req.body;
//   if (req?.method !== 'POST') return res.status(400).json({ name: 'Only POST is supported' });

//   if (!recipient) return res.status(400).json({ name: 'Recipient is required' });
//   if (!subject) return res.status(400).json({ name: 'Subject is required' });
//   if (!message) return res.status(400).json({ name: 'Message is required' });

//   let transport = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: senderEmail,
//       pass: process.env.GMAIL_PASSWORD
//       //rjzhqtwxevqqhukj
//     }
//   });
//   let mailOptions = { from: senderEmail, to: recipient, subject: subject, text: message };

//   transport.sendMail(mailOptions, function (err, info) {
//     res.json(!!err ? { 'Error: ': err } : { 'Success: ': info.response });
//   });

//   // res.status(200).json({ msg: 'Email Send' });
//   return;
// }
