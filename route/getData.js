const express = require('express');
const jwtMiddleware = require('../config/authMiddleware');
const Tab = require('../models/TabModel');

const router = express.Router();

// GET API to retrieve tab details by ID (protected with JWT)
router.get('/api/get/:tabId', jwtMiddleware, async (req, res) => {
  try {

    const tabId = req.params.tabId;

    // Fetch data based on the provided tabId
    const tab = await Tab.findById(tabId);

    if (!tab) {
      return res.status(404).json({ message: 'Tab not found' });
    }

    res.json(tab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
