// controllers/subjectController.js
import Subject from '../models/Subject.js';
import Teacher from '../models/Teacher.js';

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Private/Admin
export const createSubject = async (req, res) => {
  try {
    const { name, code, description, teacher } = req.body;

    // Validate required fields
    if (!name || !code) {
      return res.status(400).json({ 
        success: false,
        message: 'Name and code are required fields' 
      });
    }

    // Check if subject with same code already exists
    const existingSubject = await Subject.findOne({ code });
    if (existingSubject) {
      return res.status(409).json({
        success: false,
        message: 'Subject with this code already exists'
      });
    }

    // If teacher is specified, validate they exist
    if (teacher) {
      const teacherExists = await Teacher.findById(teacher);
      if (!teacherExists) {
        return res.status(404).json({
          success: false,
          message: 'Specified teacher not found'
        });
      }
    }

    // Create new subject
    const subject = await Subject.create({
      name,
      code,
      description,
      teacher: teacher || null
    });

    res.status(201).json({
      success: true,
      data: subject
    });

  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating subject',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
export const getAllSubjects = async (req, res) => {
  try {
    // Add pagination, filtering, and sorting if needed
    const subjects = await Subject.find()
      .populate('teacher', 'name email')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects
    });

  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subjects'
    });
  }
};

// @desc    Get single subject by ID
// @route   GET /api/subjects/:id
// @access  Public
export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('teacher', 'name email subject_specialty');

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.status(200).json({
      success: true,
      data: subject
    });

  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subject'
    });
  }
};

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private/Admin
export const updateSubject = async (req, res) => {
  try {
    const { name, code, description, teacher } = req.body;
    const subjectId = req.params.id;

    // Find subject to update
    let subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Check if new code conflicts with another subject
    if (code && code !== subject.code) {
      const codeExists = await Subject.findOne({ code });
      if (codeExists) {
        return res.status(409).json({
          success: false,
          message: 'Subject with this code already exists'
        });
      }
    }

    // Validate teacher if specified
    if (teacher) {
      const teacherExists = await Teacher.findById(teacher);
      if (!teacherExists) {
        return res.status(404).json({
          success: false,
          message: 'Specified teacher not found'
        });
      }
    }

    // Update subject
    subject.name = name || subject.name;
    subject.code = code || subject.code;
    subject.description = description !== undefined ? description : subject.description;
    subject.teacher = teacher !== undefined ? teacher : subject.teacher;

    const updatedSubject = await subject.save();

    res.status(200).json({
      success: true,
      data: updatedSubject
    });

  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating subject'
    });
  }
};

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private/Admin
export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Check if subject is referenced in any classes before deleting
    const isReferenced = await Class.exists({ subject: req.params.id });
    if (isReferenced) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete - subject is assigned to classes'
      });
    }

    await subject.remove();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Subject deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting subject'
    });
  }
};

// @desc    Get teachers who can teach a subject
// @route   GET /api/subjects/:id/teachers
// @access  Public
export const getSubjectTeachers = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Find teachers whose subject_specialty includes this subject
    const teachers = await Teacher.find({ 
      subject_specialty: subject.name 
    }).select('name email phone');

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });

  } catch (error) {
    console.error('Error fetching subject teachers:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching subject teachers'
    });
  }
};