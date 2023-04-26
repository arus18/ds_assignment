const axios = require('axios');

const EMAIL_SERVICE_URL = 'http://localhost:3003/api';

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
        return response.data;
      })
      .catch(error => {
        console.error(error);
        return `An error occurred while sending email for type '${emailType}'.`;
      });
  };
  
  module.exports = {
    sendEmailMiddleware,
  };
  