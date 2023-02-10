const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController.js");

// basic get and post routes
router.route("/").get(getThoughts).post(createThought);

// get put and delete routes by id
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // post route for reaction by id
router.route("/:thoughtId/reaction").post(createReaction);

// delete route for reaction by id
router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
