const router = require('express').Router();

const {
    getUsers,
    createUser,
    getSingleUser,
    removeUser,
    updateUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// GET  all users
// POST a new user: post body  =  {  "username": "...", "email": "...."}
router.route('/').get(getUsers).post(createUser)


// GET user by _id, include thought and friend data
// UPDATE user by _id
// DELETE user by _id // bonus: remove a user's associated thoughts when deleted
router.route('/:userId').get(getSingleUser).delete(removeUser).put(updateUser)


// /api/users/:userId/friends/:friendId
// POST new friend to user's friends  list
// DELETE friend from user's friends list

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;