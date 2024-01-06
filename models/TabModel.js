const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema({
  tabName: { type: String, required: true },
  displayName: { type: String, required: true },
  isAdd: { type: Boolean, default: false },
  isEdit: { type: Boolean, default: false },
  isDelete: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
});

const Tab = mongoose.model('Tab', tabSchema);

module.exports = Tab;
