// server.js - Backend server using Node.js and Express
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/book', async (req, res) => {
  const { name, email, message, date } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mettamindclinic@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: 'mettamindclinic@gmail.com',
    to: 'mettamindclinic@gmail.com',
    subject: `New Appointment Booking - ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Preferred Date: ${date}
      Message: ${message || 'No additional details'}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));