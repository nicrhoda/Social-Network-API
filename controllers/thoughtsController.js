const { Thought, User } = require("../models");

module.exports = {
  // GET ALL THOUGHTS
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET SINGLE THOUGHT BY ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // CREATE NEW THOUGHT
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // UPDATE THOUGHT BY ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE THOUGHT
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // CREATE NEW REACTION
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No thought found" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE REACTION BY ID
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactionId: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No thought found" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};
