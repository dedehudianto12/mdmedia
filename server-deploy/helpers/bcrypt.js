"use strict"

const bcrypt = require('bcrypt')

function generatePassword(myPlaintextPassword) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(myPlaintextPassword, salt);
}

function checkPassword(myPlaintextPassword, hash) {
    return bcrypt.compareSync(myPlaintextPassword, hash)
}

module.exports = {
    generatePassword, checkPassword
}