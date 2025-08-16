const Class = require('../models/Class');

// Create new class
exports.createClass = async (req, res) => {
  try {
    const { class_id, name, subject, schedule, teacher_id } = req.body;

    const existingClass = await Class.findOne({ class_id });
    if (existingClass) {
      return res.status(400).json({ message: 'Class ID already exists' });
    }

    const newClass = new Class({
      class_id,
      name,
      subject,
      schedule,
      teacher_id
    });

    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', newClass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single class
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findOne({ class_id: req.params.id });
    if (!classItem) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json(classItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update class details
exports.updateClass = async (req, res) => {
  try {
    const { name, subject, schedule, teacher_id } = req.body;

    const classItem = await Class.findOneAndUpdate(
      { class_id: req.params.id },
      { name, subject, schedule, teacher_id },
      { new: true }
    );

    if (!classItem) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json({ message: 'Class updated successfully', classItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete class
exports.deleteClass = async (req, res) => {
  try {
    const result = await Class.deleteOne({ class_id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
