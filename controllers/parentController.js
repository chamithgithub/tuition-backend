const Parent = require('../models/Parent');

// Create a new parent
exports.createParent = async (req, res) => {
  try {
    const { parent_id, name, email, phone, relation_type } = req.body;

    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newParent = new Parent({
      parent_id,
      name,
      email,
      phone,
      relation_type
    });

    await newParent.save();
    res.status(201).json({ message: 'Parent created successfully', parent: newParent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all parents
exports.getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get parent by ID
exports.getParentById = async (req, res) => {
  try {
    const parent = await Parent.findOne({ parent_id: req.params.id });
    if (!parent) return res.status(404).json({ message: 'Parent not found' });
    res.status(200).json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update parent details
exports.updateParent = async (req, res) => {
  try {
    const { name, email, phone, relation_type } = req.body;

    const parent = await Parent.findOneAndUpdate(
      { parent_id: req.params.id },
      { name, email, phone, relation_type },
      { new: true }
    );

    if (!parent) return res.status(404).json({ message: 'Parent not found' });

    res.status(200).json({ message: 'Parent updated successfully', parent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete parent
exports.deleteParent = async (req, res) => {
  try {
    const result = await Parent.deleteOne({ parent_id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Parent not found' });
    }
    res.status(200).json({ message: 'Parent deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
