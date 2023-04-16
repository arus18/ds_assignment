const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  { id: 1, username: 'john', password: 'password123', role: 'admin' },
  { id: 2, username: 'jane', password: 'password456', role: 'user' },
];

const JWT_SECRET = 'my_secret_key';

// Login endpoint
app.post('/login', (req, res) => {
  // Get username and password from request body
  const { username, password } = req.body;

  // Find user in database
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    // If user is not found, return an error response
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET);

  // Return token in response
  res.json({ token });
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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
