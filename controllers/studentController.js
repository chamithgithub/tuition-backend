const Student = require('../models/Student');

// Create new student
exports.createStudent = async (req, res) => {
  try {
    const {
      student_id,
      name,
      dob,
      email,
      phone,
      admission_date,
      class_id,
      parent_id
    } = req.body;

    const existingStudent = await Student.findOne({ student_id });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }

    const newStudent = new Student({
      student_id,
      name,
      dob,
      email,
      phone,
      admission_date,
      class_id,
      parent_id
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ student_id: req.params.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student details
exports.updateStudent = async (req, res) => {
  try {
    const { name, dob, email, phone, admission_date, class_id, parent_id } = req.body;

    const student = await Student.findOneAndUpdate(
      { student_id: req.params.id },
      { name, dob, email, phone, admission_date, class_id, parent_id },
      { new: true }
    );

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const result = await Student.deleteOne({ student_id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
