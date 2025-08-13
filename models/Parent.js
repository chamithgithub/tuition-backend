const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  parent_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  relation_type: { type: String, required: true }, // e.g., Father, Mother, Guardian
  role: { type: String, default: 'parent' }
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);
