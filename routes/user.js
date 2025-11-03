const express = require('express')
const router = express.Router()
const userController = require('../controller/userC.js')

router.get('/', userController.index)
router.post('/', userController.newUser)
router.put('/', userController.index)
router.delete('/', userController.index)

module.exports = router //=> khai bao   