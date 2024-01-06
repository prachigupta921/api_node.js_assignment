const express = require('express');
const jwt = require('jsonwebtoken');
const Tab = require('./models/TabModel');
const bodyParser = require('body-parser');
const jwtMiddleware = require('./config/authMiddleware');
const getTabByIdRoute = require('./route/getData');
const updateTabByIdRoute = require('./route/updateData');
const getPermissionDataRoute=require("./route/getPerrmissionData")

const app = express();
const PORT = 3000;
const db = require('./config/mongoose')
const secretKey = 'thisismysecretkey';
app.use(bodyParser.json()); // Replace with your own secret key

// Endpoint for generating a token (assuming no user authentication)
app.get('/generate-token', (req, res) => {
  // Replace this with your own logic for user information or authentication
  const user = {};

  // Generate a token
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

  // Send the token in the response
  res.json({ token });
});

app.post('/api/tabs', jwtMiddleware, async (req, res) => {
    try {
      const { tabName, displayName, isAdd, isEdit, isDelete, isAcDve } = req.body;
      const newTab = new Tab({
        tabName,
        displayName,
        isAdd,
        isEdit,
        isDelete,
        isAcDve,
      });
    //  const savedTab = await newTab.save();

     // Return the tabId
    // res.json({ tabId: savedTab._id });
      const savedTab = await newTab.save();
      res.json(savedTab);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use('/', getTabByIdRoute);
  app.use('/', updateTabByIdRoute);
  app.use('/', getPermissionDataRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






