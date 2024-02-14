const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserbyId,
  handlePatchUserbyId,
  handleDeleteUserbyId,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

// Routes

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserbyId)
  .patch(handlePatchUserbyId)
  .delete(handleDeleteUserbyId);

module.exports = router;
