const router = require("express").Router();

// requiring controller routes
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// basic get and post requests
router.route("/").get(getUsers).post(createUser);

// get put and delete routes for users by id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// put and delete routes for friends by id
router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;
