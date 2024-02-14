const jwt = require("jsonwebtoken");
const secret = "Vivek521@bhuv@";

function SetUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function GetUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
}

module.exports = {
  SetUser,
  GetUser,
};
