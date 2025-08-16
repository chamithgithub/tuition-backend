const Test = require('../models/Test');

// Create a new test
exports.createTest = async (req, res) => {
  try {
    const { test_id, class_id, subject, date } = req.body;

    const existing = await Test.findOne({ test_id });
    if (existing) {
      return res.status(400).json({ message: 'Test ID already exists.' });
    }

    const test = new Test({ test_id, class_id, subject, date });
    await test.save();

    res.status(201).json({ message: 'Test created successfully', test });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tests by class ID
exports.getTestsByClass = async (req, res) => {
  try {
    const { class_id } = req.params;
    const tests = await Test.find({ class_id });

    if (!tests.length) {
      return res.status(404).json({ message: 'No tests found for this class.' });
    }

    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
