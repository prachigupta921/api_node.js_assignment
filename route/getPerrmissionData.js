
const express = require('express');
const jwtMiddleware = require('../config/authMiddleware');
const router = express.Router();
const { rolesData, tabsData } = require('../permissionData');

router.get('/api/map', jwtMiddleware, async (req, res) => {
    // Perform the mapping logic here
    try {
        const rolePermissions = {};

        Object.keys(rolesData.roles).forEach(role => {
          rolePermissions[rolesData.roles[role]] = {
            tabs: {}
          };
      
          Object.keys(tabsData.tabs).forEach(tab => {
            if (tabsData.tabs[tab].includes("isactive")) {
              rolePermissions[rolesData.roles[role]].tabs[tab] = tabsData.tabs[tab];
            }
          });
        });
      
        // Send JSON response
        res.json({ rolePermissions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;