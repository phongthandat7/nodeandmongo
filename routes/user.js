const express = require('express');
const router = express.Router();
const userController = require('../controller/userC.js');

const {
  validateBody,
  validateParam,
  schemas,
} = require('../validations/validation.js');

router.get('/', userController.index);
router.post('/', validateBody(schemas.userSchema), userController.newUser);

router
  .route('/:userID')
  .get(validateParam(schemas.idSchema, 'userID'), userController.getUser)
  .put(
    validateParam(schemas.idSchema, 'userID'),
    validateBody(schemas.userSchema),
    userController.replaceUser
  )
  .patch(
    validateParam(schemas.idSchema, 'userID'),
    validateBody(schemas.userOptionalSchema),
    userController.updateUser
  )
  .delete(userController.deleteUser);

router
  .route('/:userID/decks')
  .get(validateParam(schemas.idSchema, 'userID'), userController.getUserDecks)
  .post(
    validateParam(schemas.idSchema, 'userID'),
    validateBody(schemas.deskSchema),
    userController.newUserDeck
  );

module.exports = router; //=> khai bao
