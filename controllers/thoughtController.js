const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    // GET thought by ID
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
    // create thought - req.body should look like this: { "thoughtText": ".......", "username": "......."}
    async addThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        }  catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE thought by ID
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }

            res.json({ message: 'Thought removed'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update thought by ID - req.body should look like this: { "thoughtText": "....", "username": "username"}
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                // run validators?
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID'});
            }

            res.json(thought);
        } catch (err)  {
            res.status(500).json(err);
        }
    },
    // add reaction to thought - req.body should look like this: { "reactionBody": ".....", "username": "......."}
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { new: true }
            );

            if(!thought) {
                return res.status(404).json( { message: 'No thought found with that ID'});
            }

            res.json('Reaction added');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $pull: { reactions: req.params.reactionId }},
                { new: true },
            )

            if(!thought) {
                return res.status(404).json({ message: 'No thought found by that ID'});
            }

            res.status(200).json({ message: "Reaction successfully removed"});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}