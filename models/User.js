const { Schema, model } = require('mongoose');

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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
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
        },
        {
            toJSON: {
                getters: true
            }
        }
)

// virtual that will include "friendCount" data in user data when queried
userSchema.virtual('friendCount').get(function ()  {
    return this.friends.length
})
// creates User model based on the userSchema and exports the model
const User = model('user', userSchema);

module.exports = User
