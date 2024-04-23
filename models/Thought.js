const { Schema, Types } = require('mongoose');

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
            // to do: Use a getter method to format the timestamp on query
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

// creates Thought model based on the thought schema and exports the model
const Thought = model('thought', thoughtSchema);

module.exports =  Thought;