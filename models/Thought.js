const { Schema, model } = require('mongoose');
const reactionSchema  =  require('./Reaction');

const dateFormat = require('../utils/helpers');

const thoughtSchema  = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true,
            // ref: 'user'
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

// to do:  Schema Settings:
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function() {

})
// creates Thought model based on the thought schema and exports the model
const Thought = model('thought', thoughtSchema);

module.exports =  Thought;