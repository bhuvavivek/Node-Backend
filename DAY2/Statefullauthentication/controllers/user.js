const User = require("../models/user");
const { v4: uuidV4 } = require("uuid");
const { GetUser, SetUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({ name, email, password });

  return res.json({ message: "User Created" });
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.json({ message: "invalid user name and password" });

  const sessionId = uuidV4();
  SetUser(sessionId, user);
  res.cookie("uid", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.json({ login: "sucess", message: user });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
