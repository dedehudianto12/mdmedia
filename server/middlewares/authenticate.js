"use strict"

const { checkToken } = require('../helpers/jwt')
const User = require('../models/user')

function authenticate(req, res, next) {
    try {
        const user = checkToken(req.headers.token);
        User.findById(user.id)
            .then((users) => {
                if (users) {
                    req.user = users;
                    next();
                } else {
                    next({
                        status: 404,
                        message: 'user not found'
                    });
                }
            })
            .catch(next);
    } catch (err) {
        next(err);
    }
}

module.exports = authenticate