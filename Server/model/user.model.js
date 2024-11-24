const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({


    first: String,

    last: String,

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: true,

    },
    isOnline : Boolean


})
const User = mongoose.model('User', UserSchema)
module.exports = User