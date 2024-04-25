const router = require('express').Router();

// imports all functions from thought controller file
const {
    getThoughts,
    addThought,
    getSingleThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

// all methods needed for /api/thoughts route
router.route('/').get(getThoughts).post(addThought);

// all methods needed for /api/thoughts/:thoughtId  route
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);


// post method for /api/thoughts/:thoughtId/reactions route
router.route('/:thoughtId/reactions').post(addReaction)


// delete method for /api/thoughts/:thoughtId/reactions/:reactionId route
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;