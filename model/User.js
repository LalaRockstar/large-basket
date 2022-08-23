/* eslint-disable func-names */
/* eslint-disable comma-dangle */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "An user must have a name"],
  },

  phNo: {
    type: Number,
    unique: true,
    required: [true, "Please provide your phone number"],
    min: 10,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin", "inventory", "manager", "store"],
      message: "Please select a valid role",
    },
  },
  password: {
    type: String,
    minLength: 8,
    required: [true, "Password field can't be empty"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    // only applicable on save() and create() not in update
    validate: {
      validator(val) {
        return this.password === val;
      },
      message: "Passwords must be same",
    },
  },
  passwordChangeAt: Date,
});
// ________hashing password_________//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  return next();
});

// ________comparing password__________//

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  const result = await bcrypt.compare(candidatePassword, userPassword);
  return result;
};
// _______check if the password was changed after the token was isssued___ //
userSchema.methods.passwordChangeAfter = function (jwtTimestam) {
  if (this.passwordChangeAt) {
    const changeTimeStam = this.passwordChangeAt.getTime();
    console.log(jwtTimestam, changeTimeStam);

    return jwtTimestam < changeTimeStam;
  }

  return false;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
