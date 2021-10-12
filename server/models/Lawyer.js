import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  address: {
    street: String,
    state: String,
    city: String,
    zip: String,
  },
  speciality: { type: String },
  description: { type: String },
  image: { type: String },
});

const Lawyer = mongoose.model("lawyer", lawyerSchema);

export default Lawyer;
