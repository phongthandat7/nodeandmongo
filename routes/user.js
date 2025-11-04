const express = require('express')
const router = express.Router()
const userController = require('../controller/userC.js')
const {validateParam,schemas} = require('../helper/routeHelper.js')



router.get('/', userController.index)
router.post('/', userController.newUser)



router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID'), userController.getUser)
    .put(userController.replaceUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)





router.route('/:userID/decks')
    .get(userController.getUserDecks)
    .post(userController.newUserDeck)
module.exports = router //=> khai bao   