const express = require('express');
const jwtMiddleware = require('../config/authMiddleware');
const Tab = require('../models/TabModel');

const router = express.Router();

// PUT API to update tab details by ID (protected with JWT)
router.put('/api/update/:tabId', jwtMiddleware, async (req, res) => {
  try {
    const { tabName, displayName, isAdd, isEdit, isDelete, isAcDve } = req.body;
    const updatedTab = await Tab.findByIdAndUpdate(
      req.params.tabId,
      {
        tabName,
        displayName,
        isAdd,
        isEdit,
        isDelete,
        isAcDve,
      },
      { new: true } // Return the modified document rather than the original
    );

    if (!updatedTab) {
      return res.status(404).json({ message: 'Tab not found' });
    }

    res.json(updatedTab);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
