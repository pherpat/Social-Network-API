// Require express router
const router = require('express').Router();

// set requirements
const {
    getAllThoughts,
    getSingleThoughtById,
    createNewThought, 
    updateThoughtbyId, 
    removeThoughtById, 
    addReaction, 
    removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router.route('/').get(getAllThoughts).post(createNewThought);

// api/thoughts/:Id
router.route('/:id').get(getSingleThoughtById).put(updateThoughtbyId).delete(removeThoughtById);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// Export module router
module.exports.router;