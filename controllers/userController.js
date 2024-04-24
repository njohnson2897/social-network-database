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
}