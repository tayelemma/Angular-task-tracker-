const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    userId: String,
    title: String,
    description: String,
    deadline: String,
    steps: [
      {
        title: String,
        description: String,
        status: String,
        deadline: String,
        dateCreated: {type: Date, default: Date.now},
      }
    ],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Goal", goalSchema);
