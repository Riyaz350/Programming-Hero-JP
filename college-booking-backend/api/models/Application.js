import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeName: { type: String, required: true },
  candidateName: String,
  subject: String,
  email: String,
  phone: String,
  address: String,
  dob: Date,
  image: String
}, { timestamps: true })

export default mongoose.model('Application', applicationSchema)
