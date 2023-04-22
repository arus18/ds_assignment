const axios = require('axios');

const EMAIL_SERVICE_URL = 'https://api.emailservice.com/send';

const sendEmailMiddleware = (req, res, next) => {
    const { emailType } = req.params;
    const { buyerEmail } = req.body;
    const endpointMap = {
      orderConfirmed: '/orderConfirmed',
      orderFailed: '/orderFailed',
      deliverySuccess: '/deliverySuccess',
      deliveryFailed: '/deliveryFailed',
      paymentSuccess: '/paymentSuccess',
      paymentFailed: '/paymentFailed',
    };
  
    if (!endpointMap[emailType]) {
      return res.status(404).json({
        message: `Email type '${emailType}' is not supported.`,
      });
    }
  
    const endpoint = endpointMap[emailType];
    const url = `${EMAIL_SERVICE_URL}${endpoint}`;
  
    const data = {
      buyerEmail,
    };
  
    axios.post(url, data)
      .then(response => {
        return res.json(response.data);
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({
          message: `An error occurred while sending email for type '${emailType}'.`,
        });
      });
  };
  
  module.exports = {
    sendEmailMiddleware,
  };
  