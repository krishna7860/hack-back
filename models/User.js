const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, "Name cannot be more than 50 Characters"],
  },

  walletAddress: { type: String, unique: true },
  bio: {
    type: String,
    maxlength: [500, "Name cannot be more than 50 Characters"],
  },

  networkId: {
    type: Number,
  },
  discord: {
    type: String,
  },
  twitter: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  Skills: {
    type: [String],
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Writer",
      "Designer",
      "Marketer",
      "Frotend-dev",
      "Backend-dev",
      "Blockchain-dev",
      "Auditor",
      "Content creator",
      "Community Manager",
      "Bussiness Developer",
      "Data Scientist",
      "Analytics",
      "Ops",
      "Finance",
      "Founder",
      "Product",
      "Governance",
      "Degen",
    ],
  },

  profileStatus: {
    type: String,

    enum: ["Open to Hire", "Looking for Job"],
    default: "Looking for Job",
  },
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
