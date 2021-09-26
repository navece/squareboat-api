const User = require("../models/User");

const isValid = (username, password, handle) => {
  //username validation
  if (username.length < 3) {
    return { valid: false, error: { username: "Atleast 3 character" } };
  }
  for (let i = 0; i < username.length; i++) {
    if (username[i] === " ") {
      return {
        valid: false,
        error: { username: "Must not contain whitespaces" },
      };
    }
  }
  //password validation
  if (password.length < 6) {
    return { valid: false, error: { password: "Atleast 6 character" } };
  }
  for (let i = 0; i < password.length; i++) {
    if (password[i] === " ") {
      return {
        valid: false,
        error: { password: "Must not contain whitespaces" },
      };
    }
  }
  //handle validation
  if (handle.length < 3) {
    return { valid: false, error: { handle: "Atleast 3 character" } };
  }
  for (let i = 0; i < handle.length; i++) {
    if (handle[i] === " ") {
      return {
        valid: false,
        error: { handle: "Must not contain whitespaces" },
      };
    }
  }
  return { valid: true };
};

module.exports = { isValid };
