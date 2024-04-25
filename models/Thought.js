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
            // I got help with this getter method from my tutor Jaytee Padilla
            get: (timestamp) => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

// virtual that will include "reactionCount" in thoughts data when queried
thoughtSchema.virtual('reactionCount').get(function() {

})
// creates Thought model based on the thought schema and exports the model
const Thought = model('thought', thoughtSchema);

module.exports =  Thought;