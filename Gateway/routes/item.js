const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();
const Config = require('../config');

app.use(express.json());

const ITEM_REVIEW_API_URL = `${Config.ITEM_SERVICE}/item-reviews`;

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${Config.ITEM_SERVICE}/items`, req.body);
    const savedItem = response.data;
    res.status(200).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to save item' });
  }
});

router.get('/', async (req, res) => {
    try {
      const response = await axios.get(`${Config.ITEM_SERVICE}/items`);
      const items = response.data;
      res.json(items);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  });
  
  // GET single item by ID
  router.get('/:id', async (req, res) => {
    try {
      const response = await axios.get(`${Config.ITEM_SERVICE}/items/${req.params.id}`);
      const item = response.data;
      res.json(item);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  });
  
  // CREATE new item
  router.post('/', async (req, res) => {
    try {
      const response = await axios.post(`${Config.ITEM_SERVICE}/items`, req.body);
      const savedItem = response.data;
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  });
  
  // UPDATE item by ID
  router.patch('/:id', async (req, res) => {
    try {
      console.log("item update hit")
      const response = await axios.patch(`${Config.ITEM_SERVICE}/items/${req.params.id}`, req.body);
      const updatedItem = response.data;
      res.json(updatedItem);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  });
  
  // DELETE item by ID
  router.post('/delete/:id', async (req, res) => {
    try {
      console.log("item delete hit")
      const response = await axios.delete(`${Config.ITEM_SERVICE}/items/${req.params.id}`);
      const deletedItem = response.data;
      res.json(deletedItem);
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  });
  
  router.post('/itemreviews', async (req, res) => {
    try {
      const { item_id, buyer_id, review } = req.body;
      const response = await axios.post(`${ITEM_REVIEW_API_URL}`, { item_id, buyer_id, review });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/itemreviews', async (req, res) => {
    try {
      const response = await axios.get(`${ITEM_REVIEW_API_URL}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/itemreviews/:id', async (req, res) => {
    try {
      const response = await axios.get(`${ITEM_REVIEW_API_URL}/${req.params.id}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/itemreviews/:id', async (req, res) => {
    try {
      const { item_id, buyer_id, review } = req.body;
      const response = await axios.put(`${ITEM_REVIEW_API_URL}/${req.params.id}`, { item_id, buyer_id, review });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/itemreviews/:id', async (req, res) => {
    try {
      const response = await axios.delete(`${ITEM_REVIEW_API_URL}/${req.params.id}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;