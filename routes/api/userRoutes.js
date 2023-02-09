const router = require("express").Router();
//update as needed
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController.js");

router.route("/").get(getUsers).post(createUser);

router.route(":userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
