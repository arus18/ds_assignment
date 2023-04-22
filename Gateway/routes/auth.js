const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router();
const Config = require('../config');

app.get('/login', async (req, res) => {
    try {
      const email = req.query.email;
      const password = req.query.password;
      // Send a POST request to the login endpoint of the user service
      const response = await axios.post(`${Config.AUTH_SERVICE}/login`, { email, password });
      // Return the JWT token in the response
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });

  app.get('/protected', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        // If token is not present, return an error response
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      // Send a GET request to the protected endpoint of the user service with the JWT token in the Authorization header
      const response = await axios.get(`${Config.AUTH_SERVICE}/protected`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Return the user information in the response
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

  module.exports = router;