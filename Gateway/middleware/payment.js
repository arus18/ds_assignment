const axios = require('axios');

// Create a payment
async function createPayment(paymentData) {
  try {
    const response = await axios.post('http://payment-service/api/payments', paymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// Get all payments
async function getAllPayments() {
  try {
    const response = await axios.get('http://payment-service/api/payments');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// Get a single payment by ID
async function getPaymentById(paymentId) {
  try {
    const response = await axios.get(`http://payment-service/api/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// Update a payment by ID
async function updatePayment(paymentId, updatedPaymentData) {
  try {
    const response = await axios.patch(`http://payment-service/api/payments/${paymentId}`, updatedPaymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// Delete a payment by ID
async function deletePayment(paymentId) {
  try {
    const response = await axios.delete(`http://payment-service/api/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

module.exports = { createPayment, getAllPayments, getSinglePayment, updatePayment, deletePayment };
