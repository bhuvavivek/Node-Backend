const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const alldbUsers = await User.find({});
  return res.json(alldbUsers);
}

async function handleGetUserbyId(req, res) {
  const user = await User.findById(req.params.id);
  return res.status(200).json(user);
}

async function handlePatchUserbyId(req, res) {
  // can u update a user model with id
  const id = req.params.id;
  const body = req.body;

  const user = await User.findByIdAndUpdate(id, body, { new: true });
  return res.status(200).json({ status: "success", user: user });
}

async function handleDeleteUserbyId(req, res) {
  // delete  a user with id
  const user = await User.findByIdAndDelete(req.params.id, req.body);
  return res.status(200).json({ status: "success", user: user });
}

async function handleCreateNewUser(req, res) {
  // create a new user
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.email ||
    !body.lastName ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res
      .status(400)
      .json({ status: "error", msg: "All fields are Required" });
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  console.log(result);
  res.status(201).json({ staus: "success", user: result });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserbyId,
  handlePatchUserbyId,
  handleDeleteUserbyId,
  handleCreateNewUser,
};
