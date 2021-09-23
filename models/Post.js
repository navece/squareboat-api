const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 1000,
    },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
