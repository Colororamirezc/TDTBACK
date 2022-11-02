const mongoose = require("mongoose");
const { roles } = require("../constants/roles");

const userSchema = new mongoose.Schema(
  {
    name: String,
    lastName: String,
    rut: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    grade: String,
    specialty: String,
    administrativePermission: Number,
    FLA: Number,
    area: String,
    encryptPassword: String,
    role: {
      type: String,
      default: roles.student,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
