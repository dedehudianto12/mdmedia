"use strict"

const mongoose = require('mongoose')
const { generatePassword } = require('../helpers/bcrypt')

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'full name is required'],
        validate: {
            validator: function (value) {
                return User.findOne({ full_name: value })
                    .then((user) => {
                        if (user) {
                            return false
                        } else {
                            return true
                        }
                    })
            },
            message: 'Name already used'
        }
    },
    email: {
        type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is invalid'],
        validate: {
            validator: function (value) {
                return User.findOne({ email: value })
                    .then((user) => {
                        if (user) {
                            return false
                        } else {
                            return true
                        }
                    })
            },
            message: 'Email already used'
        },
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'minimum character is 6']
    }
})

userSchema.pre('save', function () {
    const currentPassword = this.get('password')
    const hashPassword = generatePassword(currentPassword)
    this.set({ password: hashPassword })
})

const User = mongoose.model('User', userSchema)

module.exports = User