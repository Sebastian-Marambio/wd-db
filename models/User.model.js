const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true},
    // email?
    password: {
      type: String,
      required: true,
      minlength: 8},
    ratings: [{
      tool: {
        type: Schema.Types.ObjectId,
        ref: 'Tools',
      },
      ratingValue: { type: Number }
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
