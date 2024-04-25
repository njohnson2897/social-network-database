const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    // get user by ID
    async getSingleUser(req, res) {
        try {
        const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');

        if (!user) {
            return res.status(404).json({message: 'No user with that ID' })
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    },
    // create user, req.body should look like  { "username": "....", "email": "...." }
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        }  catch (err) {
            res.status(500).json(err);
        }
    },
    // delete user
    // bonus: remove a user's associated thoughts when deleted
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }

            res.json({ message: 'User removed'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update user by ID, req.body should look like { "username": "....", "email": "......"}
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that ID'});
            }

            res.json(user);
        } catch (err)  {
            res.status(500).json(err);
        }
    },
    // adds new friend to another user's friends array
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { new: true }
            );

            if(!user) {
                return res.status(404).json( { message: 'No user found with that ID'});
            }

            res.json('Friend added');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // removes "friend" user and also pulls the friend from another user's friends array
    // /api/users/:userId/friends/:friendId
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: { friends: req.params.friendId }},
                { new: true },
            )

            if(!user) {
                return res.status(404).json({ message: 'No user found by that ID'});
            }

            res.status(200).json({ message: "Friend successfully removed"});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}