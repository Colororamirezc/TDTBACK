const mongoose = require("mongoose");
const { roles } = require("../constants/roles");

const reasonSchema = new mongoose.Schema(
  {
    name: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reason", reasonSchema);