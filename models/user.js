const mongoose = require("mongoose");
const { roles } = require("../constants/roles");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    rut: {
      type: String,
      required: true,
      index: true,
    },
    grade: String,
    specialty: String,
    administrativePermission: Number,
    FLA: Number,
    password: String,
    role: {
      type: String,
      default: roles.student,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
