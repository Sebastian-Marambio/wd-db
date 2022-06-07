const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const toolSchema = new Schema({
  toolName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  }, 
  category: {
    type: [String],
    enum: ["general", "cloud", "graphic", "assets", "editor", "bugs"],
    required: true,
  }, // oder select/enum?
  img: { type: String },
  //img must be valid web address or can be uploaded via media uploads
  rating: {type: Number, default: '0'},
  numberOfRatings: { type: Number, default: '0' },
  downloadLink: String,
  downloads: { type: Number, default: '0' },
  createDate: {
    type: Date,
    default: Date.now 
  },
  creator: { type: Schema.Types.ObjectID, ref: "User" },
});

const Tools = model("tool", toolSchema);

module.exports = Tools; 
