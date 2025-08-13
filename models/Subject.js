// models/Subject.js
import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true }, // e.g., MATH101
  description: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // optional: default teacher
},{ timestamps: true });

export default mongoose.model('Subject', subjectSchema);
