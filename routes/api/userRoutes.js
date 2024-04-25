const router = require('express').Router();

// requires all functions from user controllers file
const {
    getUsers,
    createUser,
    getSingleUser,
    removeUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// all methods needed for /api/users route
router.route('/').get(getUsers).post(createUser)

// methods needed for /api/users/:userId route
router.route('/:userId').get(getSingleUser).delete(removeUser).put(updateUser)

// methods needed for /api/users/:userId/friends/:friendId route
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;