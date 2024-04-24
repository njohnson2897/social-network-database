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
        const user = await User.findOne({ _id: req.params.userId });

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
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

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
                // run validators?
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that ID'});
            }

            res.json(user);
        } catch (err)  {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const friend = await User.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { friends: friend._id }},
                { new: true }
            );

            if(!user) {
                return res.status(404).json( { message: 'Friend created, but no user found with that ID'});
            }

            res.json('Friend added');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndRemove({ _id: req.params.friendId });

            if(!user) {
                return res.status(404).json({ message: 'No friend found by that ID'});
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $pull: { videos: req.params.videoId }},
                { new: true },
            )

            res.status(200).json({ message: "Friend successfully removed"});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}