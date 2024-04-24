const { Schema, Types }  = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // to do: Use a getter method to format the timestamp on query
        },
    },
    {
        toJSON: {
            getters: true,
        },
    },
);

// exports the schema but we don't create a model because reactions will not be in database 
// ... as their own collection, only attached to Thoughts
module.exports = reactionSchema;
