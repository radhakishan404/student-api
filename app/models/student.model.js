import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    dob: { type: String, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true, required: true, unique: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    gender: { type: String, trim: true },
    is_active: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Student = mongoose.model("student", studentSchema);

export default Student;