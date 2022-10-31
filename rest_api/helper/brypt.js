const brypt = require('bcryptjs')

function hashPassword (password) {
    return brypt.hashSync(password, 10)
}

function matchPassword (inputPassword, hashPassword) {
    return brypt.compareSync(inputPassword, hashPassword)
}

module.exports = {hashPassword, matchPassword}