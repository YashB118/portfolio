const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const { contactLimiter } = require('../middleware/rateLimiter');

const validators = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).escape(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }).escape(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }).escape()
];

router.post('/', contactLimiter, validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg }))
    });
  }

  try {
    const { name, email, subject, message } = req.body;
    const msg = await Message.create({ name, email, subject, message });

    if (
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_PASS !== 'your_app_password_here'
    ) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.TO_EMAIL,
        subject: `[Portfolio] ${msg.subject}`,
        html: `
          <h3>New message from your portfolio</h3>
          <p><strong>Name:</strong> ${msg.name}</p>
          <p><strong>Email:</strong> ${msg.email}</p>
          <p><strong>Subject:</strong> ${msg.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${msg.message}</p>
        `
      });
    }

    res.json({ success: true, message: 'Your message has been sent. Thank you.' });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
