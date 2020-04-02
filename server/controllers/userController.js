"use strict"

const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { checkPassword, generatePassword } = require('../helpers/bcrypt')
const { sendEmail } = require('../helpers/nodemailer')
let realVal = {}

class UserController {
    static create(req, res, next) {
        const obj = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
            .then((user) => {
                const token = generateToken(user)
                res.status(201).json({
                    status: 'Success',
                    message: 'Success Register User',
                    payload: token
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const err = []
        for (let i in req.body) {
            if (!req.body[i]) {
                err.push(`${i} is required`)
            }
        }
        if (err.length > 0) {
            next({
                status: 404,
                message: err.join(',')
            })
        }
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    next({
                        status: 404,
                        message: 'wrong email / password'
                    })
                } else {
                    if (!checkPassword(req.body.password, user.password)) {
                        next({
                            status: 404,
                            message: 'wrong email / password'
                        })
                    } else {
                        const val = Math.floor(100000 + Math.random() * 900000);
                        sendEmail(user.email, val)
                        realVal.user.email = { emil: user.email, payload: val }
                        const token = generateToken(user)
                        res.status(200).json({
                            status: 'Success',
                            message: 'Success Login User',
                            payload: token
                        })
                    }
                }
            })
    }

    static generateValidationNumber(req, res, next) {
        try {
            const val = Math.floor(100000 + Math.random() * 900000);
            sendEmail(req.user.email, val)
            realVal[req.user.email] = { email: req.user.email, payload: val }
            res.status(200).json({
                status: 'Success',
                message: 'Success Send OTP code, check you email'
            })
        }
        catch (err) {
            next({
                status: 500,
                message: err.message
            })
        }
    }

    static validation(req, res, next) {
        if (Number(realVal[req.user.email].payload) === Number(req.body.validation_number)) {
            res.status(200).json({
                status: 'Success',
                message: 'Success Validate User'
            })
        } else {
            next({
                status: 404,
                message: 'Invalid token'
            })
        }
    }

    static changePassword(req, res, next) {
        if (checkPassword(req.body.current_password, req.user.password)) {
            if (req.body.new_password === req.body.reenter_new_password) {
                const newPassword = generatePassword(req.body.new_password)
                User.findByIdAndUpdate(req.user._id, { password: newPassword })
                    .then(user => {
                        res.status(200).json({
                            status: 'Success',
                            message: 'Success Update User Password'
                        })
                    })
                    .catch(err => {
                        next(err)
                    })
            } else {
                next({
                    status: 404,
                    message: 'New password with reenter new pasword must same'
                })
            }
        } else {
            next({
                status: 404,
                message: 'Wrong Current Password'
            })
        }
    }
}

module.exports = UserController