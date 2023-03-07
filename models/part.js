const mongoose = require("mongoose");
const { roles } = require("../constants/roles");

const partSchema = new mongoose.Schema(
  {
    course: String,
    date: String,
    part: [
      {
        grade: String,
        specialty: String,
        name: String,
        lastName: String,
        rut: String,
        FLA: Number,
        administrativePermissions: Number,
        area: String,
        course: String,
        lunch: Boolean,
        reason: String
      }
    ],
    reasonNumber: Number

  },
  { timestamps: true }
);

module.exports = mongoose.model("Part", partSchema);