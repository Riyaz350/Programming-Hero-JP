import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  applicantEmail: { type: String, required: true }, // email of the user who filled the form
  collegeName: { type: String, required: true },
  candidateName: String,
  subject: String,
  email: String, // candidate email
  phone: String,
  address: String,
  dob: Date,
  image: String
}, { timestamps: true })

export default mongoose.model('Application', applicationSchema)
