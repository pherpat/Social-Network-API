// Require express router
const router = require('express').Router();

// set requirements
const {
    getAllThoughts,
    getThoughtById,
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// api/thoughts/:Id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// Export module router
module.exports = router;