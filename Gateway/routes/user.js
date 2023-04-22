const express = require('express');
const router = express.Router();
const axios = require('axios');
const Config = require('../config');

// GET user by email
router.get('/getUserByEmail/:email', async (req, res) => {
  try {
    const response = await axios.get(`http://${Config.USER_SERVICE}/users/getUserByEmail/${req.params.email}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all buyers
router.get('/buyers', async (req, res) => {
  try {
    const response = await axios.get(`${Config.USER_SERVICE}/buyer/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message + " User service -" + Config.USER_SERVICE });
  }
});

// GET a single buyer by ID
router.get('/buyers/:id', async (req, res) => {
  try {
    const response = await axios.get(`${Config.USER_SERVICE}/buyers/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new buyer
router.post('/buyers', async (req, res) => {
  try {
    const response = await axios.post(`${Config.USER_SERVICE}/buyers/`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE an existing buyer
router.put('/buyers/:id', async (req, res) => {
  try {
    const response = await axios.put(`${Config.USER_SERVICE}/buyers/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a buyer
router.delete('/buyers/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${Config.USER_SERVICE}/buyers/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all sellers
router.get('/sellers', async (req, res) => {
    try {
      const response = await axios.get(`${Config.USER_SERVICE}/sellers`);
      res.json(response.data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // GET a single seller by ID
  router.get('/sellers/:id', async (req, res) => {
    try {
      const response = await axios.get(`${Config.USER_SERVICE}/sellers/${req.params.id}`);
      res.json(response.data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // CREATE a new seller
  router.post('/sellers', async (req, res) => {
    try {
      const response = await axios.post(`${Config.USER_SERVICE}/sellers`, req.body);
      res.json(response.data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // UPDATE a seller by ID
  router.put('/sellers/:id', async (req, res) => {
    try {
      const response = await axios.put(`${Config.USER_SERVICE}/sellers/${req.params.id}`, req.body);
      res.json(response.data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  // DELETE a seller by ID
  router.delete('/sellers/:id', async (req, res) => {
    try {
      const response = await axios.delete(`${Config.USER_SERVICE}/sellers/${req.params.id}`);
      res.json(response.data);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
