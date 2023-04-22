const axios = require('axios');

// CREATE a new delivery
async function createDelivery(data) {
  try {
    const response = await axios.post('http://delivery-service/api/deliveries', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create delivery');
  }
}

// READ all deliveries
async function getDeliveries() {
  try {
    const response = await axios.get('http://delivery-service/api/deliveries');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get deliveries');
  }
}

// READ a single delivery by ID
async function getDeliveryById(id) {
  try {
    const response = await axios.get(`http://delivery-service/api/deliveries/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get delivery with ID ${id}`);
  }
}

// UPDATE a delivery by ID
async function updateDelivery(id, data) {
  try {
    const response = await axios.put(`http://delivery-service/api/deliveries/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to update delivery with ID ${id}`);
  }
}

// DELETE a delivery by ID
async function deleteDelivery(id) {
  try {
    await axios.delete(`http://delivery-service/api/deliveries/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete delivery with ID ${id}`);
  }
}

module.exports = { createDelivery, getDeliveries, getDeliveryById, updateDelivery, deleteDelivery };
