const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
    
            if (!thought) {
                return res.status(404).json({message: 'No thought with that ID' })
            }
    
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addThought(req, res) {

    },

    async removeThought(req, res) {

    },

    async updateThought(req, res) {

    },

    async addReaction(req, res) {

    },

    async removeReaction(req, res) {

    },
}