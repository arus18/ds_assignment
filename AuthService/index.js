const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  { id: 1, username: 'john', password: 'password123', role: 'admin' },
  { id: 2, username: 'jane', password: 'password456', role: 'user' },
];

const JWT_SECRET = 'my_secret_key';
const USER_SERVICE = "http://herbal-user-backend.ds-assignment.svc.cluster.local";
// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Send a HTTP request to the user service to get the user by email
    const response = await axios.get(`${USER_SERVICE}/buyer/getUserByEmail/${email}`);
    const user = response.data;
    // Check if password is correct
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    // Return token in response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid email or password' });
  }
});


// Protected endpoint
app.get('/protected', (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // If token is not present, return an error response
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // If token is valid, return a success response with user information
    res.json({ user: decoded });
  } catch (error) {
    // If token is invalid, return an error response
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get("/health", (req, res) => {
  res.json({
    message: "Auth service is fine. 👌",
    time: new Date()
  })
});

app.listen(3001, () => {
  console.log('Server started on port 3000');
});