const router = require('express').Router();
// Add routes for create,update,delete, and removed/add Thoughts
const {
    getThoughts,
    getSingleThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
    
} = require('../../controllers/thoughtController');

// Routes to get all Thoughts and add to Thought database /api/Thoughts
router.route('/').get(getThoughts).post(addThought);

// Routes for Single Thought /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Routes for Thought's Reactions /api/Thoughts/:ThoughtId/Reactions
router.route('/:thoughtId/reactions').post(addReaction);

// Routes for Single Reaction /api/Thoughts/:ThoughtId/Reactions/:ReactionId
router.route('/:ThoughtId/Reactions/:ReactionId').delete(deleteReaction);

module.exports = router