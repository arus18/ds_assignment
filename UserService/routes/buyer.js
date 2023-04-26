// routes/buyer.js

const express = require('express');
const router = express.Router();
const Buyer = require('../models/buyer');


router.get('/getUserByEmail/:email', (req, res) => {
  const email = req.params.email;
  
  Buyer.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }
    res.json({ user });
  });
});

// GET all buyers
router.get('/', async (req, res) => {
  try {
    console.log("user service - /buyers hit.");
    const buyers = await Buyer.find();
    res.status(200).json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single buyer by ID
router.get('/:id', getBuyer, (req, res) => {
  res.json(res.buyer);
});

// CREATE a new buyer
router.post('/', async (req, res) => {
  const buyer = new Buyer({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newBuyer = await buyer.save();
    res.status(201).json(newBuyer);
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an existing buyer
router.put('/:id', getBuyer, async (req, res) => {
  if (req.body.name != null) {
    res.buyer.name = req.body.name;
  }
  if (req.body.email != null) {
    res.buyer.email = req.body.email;
  }
  if (req.body.password != null) {
    res.buyer.password = req.body.password;
  }

  try {
    const updatedBuyer = await res.buyer.save();
    res.json(updatedBuyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a buyer
router.delete('/:id', getBuyer, async (req, res) => {
  try {
    await res.buyer.remove();
    res.json({ message: 'Buyer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a buyer by ID
async function getBuyer(req, res, next) {
  try {
    buyer = await Buyer.findById(req.params.id);
    if (buyer == null) {
      return res.status(404).json({ message: 'Cannot find buyer' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.buyer = buyer;
  buyer.remove = async function () {
    try {
      await Buyer.findByIdAndDelete(this._id);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  next();
}

module.exports = router;
