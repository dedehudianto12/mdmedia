"use strict"

const express = require('express')
const router = express.Router()

const authenticate = require('../middlewares/authenticate')
const userController = require('../controllers/userController')

router.post('/register', userController.create)
router.post('/login', userController.login)

router.use(authenticate)
router.post('/token', userController.generateValidationNumber)
router.post('/validation', userController.validation)

router.patch('/changePassword', userController.changePassword)


module.exports = router