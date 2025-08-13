const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // <-- Make sure this is included
// Create new admin

exports.createAdmin = async (req, res) => {

  try {
    const { admin_id, name, email, password, phone } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const admin = new Admin({
      admin_id,
      name,
      email,
      password_hash,
      phone,
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password_hash');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

// Admin login
exports.loginAdmin = async (req, res) => {
   try {
     const { email, password } = req.body;
 
     const admin = await Admin.findOne({ email });
     if (!admin) {
       return res.status(404).json({ message: 'Admin not found' });
     }
 
     const isMatch = await bcrypt.compare(password, admin.password_hash);
     if (!isMatch) {
       return res.status(401).json({ message: 'Invalid credentials' });
     }
 
     const token = jwt.sign(
       { adminId: admin.admin_id, email: admin.email },
       process.env.JWT_SECRET,
       { expiresIn: '1d' }
     );
 
     res.status(200).json({
       message: 'Login successful',
       token,
       admin
     });
 
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };
