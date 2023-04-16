const express = require('express');
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Extracted sendEmail function
function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: 'sliitassignments50@gmail.com',
      pass: 'adhhaxlmjmmwnxzk'
    }
  });

  const mailOptions = {
    from: 'sliitassignments50@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Endpoint for order confirmed
router.post('/orderConfirmed', (req, res) => {
  const { buyerEmail } = req.body;
  const subject = 'Order Confirmed';
  const text = 'Your order has been confirmed.';
  sendEmail(buyerEmail, subject, text);
  res.send('Email sent to buyer.');
});

// Endpoint for order failed
router.post('/orderFailed', (req, res) => {
  const { buyerEmail } = req.body;
  const subject = 'Order Failed';
  const text = 'Your order has failed.';
  sendEmail(buyerEmail, subject, text);
  res.send('Email sent to buyer.');
});

// Endpoint for delivery success
router.post('/deliverySuccess', (req, res) => {
  const { buyerEmail } = req.body;
  const subject = 'Delivery Success';
  const text = 'Your order has been delivered successfully.';
  sendEmail(buyerEmail, subject, text);
  res.send('Email sent to buyer.');
});

// Endpoint for delivery failed
router.post('/deliveryFailed', (req, res) => {
  const { buyerEmail } = req.body;
  const subject = 'Delivery Failed';
  const text = 'Your order delivery has failed.';
  sendEmail(buyerEmail, subject, text);
  res.send('Email sent to buyer.');
});

// Endpoint for payment success
router.post('/paymentSuccess', (req, res) => {
  const { buyerEmail } = req.body;
  const subject = 'Payment Success';
  const text = 'Your payment has been completed successfully.';
  sendEmail(buyerEmail, subject, text);
  res.send('Email sent to buyer.');
});

// Endpoint for payment failed
router.post('/paymentFailed', (req, res) => {
  const { buyerEmail } = req.body;
  const subject = 'Payment Failed';
  const text = 'Your payment has failed.';
  sendEmail(buyerEmail, subject, text);
  res.send('Email sent to buyer.');
});


module.exports = router;