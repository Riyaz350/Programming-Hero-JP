import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // email/password users
  university: { type: String },
  address: { type: String },
  socialLogin: { type: Boolean, default: false }, // true if Google/Github
}, { timestamps: true })

export default mongoose.model('User', userSchema)
