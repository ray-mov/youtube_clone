
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password Required'],
  },
  fullName: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  refreshedToken: {
    type: String
  },
  watchHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },]


}, { timestamps: true });


userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8)
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function (password) {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username
    }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
  )
}

userSchema.methods.generateRefreshToken = async function (password) {
  jwt.sign(
    {
      _id: this._id,

    }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
  )
}


export const User = mongoose.model("User", userSchema);

