const User = require("../models/user");
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

  const token = SetUser(user);
  res.cookie("uid", token);

  return res.json({ login: "sucess", message: user });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
