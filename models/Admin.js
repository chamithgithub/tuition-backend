const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  admin_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String },
  created_at: { type: Date, default: Date.now },
  role:{type: String, default: 'admin' },
});
adminSchema.set('timestamps', true);

module.exports = mongoose.model('Admin', adminSchema);
