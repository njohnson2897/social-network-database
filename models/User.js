const { Schema, model } = require('mongoose');
const thoughtSchema =  require('./Thought');

const userSchema  = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/'
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'user',
            }
        ]
        }
)

// to do: schema settings - Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// creates User model based on the userSchema and exports the model
const User = model('user', userSchema);

module.exports = User
