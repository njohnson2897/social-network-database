const router = require('express').Router();

const {
    getThoughts,
    addThought,
    getSingleThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
// GET all thoughts
// POST new thought, don't forget to push created thought's _id to the user's thoughts array field

router.route('/').get(getThoughts).post(addThought);

// /api/:thoughtId
// GET thought by _id
// UPDATE thought by _id
// DELETE thought by _id

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);


// /api/thoughts/:thoughtId/reactions
// POST new reaction stored in thought's reactions array
// DELETE reaction by reactionId

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)