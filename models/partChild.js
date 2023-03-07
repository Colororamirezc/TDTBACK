const mongoose = require("mongoose");
const { roles } = require("../constants/roles");

const partChildSchema = new mongoose.Schema(
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
    ]

  },
  { timestamps: true }
);

module.exports = mongoose.model("PartChild", partChildSchema);