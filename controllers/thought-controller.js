// Required Thought and User Models
const { Thought, User } = require('../models');

// Set up Thought Controller
const thoughtController = {

// Get all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

// Get one Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

// Create Thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          // push the created thought's _id to the associated user's thoughts array field
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'Thought created but no user with this id' });
        }

        res.json({ message: 'Thought created' });
      })
      .catch((err) => res.json(err));
  },

// Update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

// Delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id' });
        }

// Remove thought id --- //$pull removes from an existing values that match a specified condition ---
    return User.findOneAndUpdate(
      { thoughts: params.id },
      { $pull: { thoughts: params.id } }, 
      { new: true }
     );
     })
    .then((dbUserData) => {
    if (!dbUserData) {
        return res
        .status(404)
        .json({ message: 'Thought created but no user with this id' });
    }
    res.json({ message: 'Thought deleted' });
    })
    .catch((err) => res.json(err));
  },

// Add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then((dbThoughtData) => {
    if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with this id' });
        return;
    }
    res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
  },

// Delete reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

// Export module thought controller
module.exports = thoughtController;


