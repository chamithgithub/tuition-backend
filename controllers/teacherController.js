const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // <-- Make sure this is included

// Create new teacher
exports.createTeacher = async (req, res) => {
  try {
    const {
      teacher_id, name, email, password, phone,
      subject_specialty, joining_date, admin_id
    } = req.body;

    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const teacher = new Teacher({
      teacher_id,
      name,
      email,
      password_hash,
      phone,
      subject_specialty,
      joining_date,
      admin_id
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ teacher_id: req.params.teacher_id });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
  try {
    const updated = await Teacher.findOneAndUpdate(
      { teacher_id: req.params.teacher_id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Updated', teacher: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const deleted = await Teacher.findOneAndDelete({ teacher_id: req.params.teacher_id });
    if (!deleted) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Teacher login
exports.loginTeacher = async (req, res) => {
   try {
     const { email, password } = req.body;
 
     const teacher = await Teacher.findOne({ email });
     if (!teacher) {
       return res.status(404).json({ message: 'teacher not found' });
     }
 
     const isMatch = await bcrypt.compare(password, teacher.password_hash);
     if (!isMatch) {
       return res.status(401).json({ message: 'Invalid credentials' });
     }
 
     const token = jwt.sign(
       { teacherId: teacher.teacher_id, email: teacher.email },
       process.env.JWT_SECRET,
       { expiresIn: '1d' }
     );
 
     res.status(200).json({
       message: 'Login successful',
       token,
       teacher
     });
 
   } catch (err) {
     res.status(500).json({ error: err.message });
   }
 };

