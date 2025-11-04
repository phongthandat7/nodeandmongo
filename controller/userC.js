const { get } = require("mongoose");
const User = require("../model/User");
const Deck = require("../model/Deck");
const Joi = require("joi");





// const idSchema: Joi.object().keys({
//     param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()})|


//PROMISE 
// const index = (req, res, next) =>{
//     User.find({}).then((users)=>{
//         return res.status(201).json({users})
// }).catch(err=>next(err))}


const getUser = async (req, res, next) => {
    // console.log('req param', req.params)

    // const validationResult =idSchema.validate(req.params)
    // console.log('validationResult', validationResult)

    const {userID} = req.params


    const user = await User.findById(userID)
    console.log('user info', user)

    return res.status(200).json({user})
}
const getUserDecks = async (req, res, next) => {
    const { userID } = req.params

    const user = await User.findById(userID).populate('decks')//ten truong muon join
    console.log('user info', user.decks)
    return res.status(200).json({decks: user.decks})
}

const index = async (req, res, next) =>{
    try{
        const users = await User.find({});
        return res.status(200).json({users})
    }catch (error){
        next(error)
    }
}


// const index = async (req, res, next) => {
// const users = await User.find({});
//     return res.status(200).json({users})
//   };

const newUser =  async (req, res, next) => {
    // console.log('req.body content ', req.body)
    const newUser = new User(req.body) 

    // const { email } = req.body;

    // const existing = await User.findOne({ email });
    // if (existing) {
    //   return res.status(400).json({ 
    //     message: "Email already exists"
    //  });
    // }

    // console.log('newUser', newUser)
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser)
}
const newUserDeck = async (req, res, next) => {
    const { userID } = req.params

    //Tao deck moi
    const newDeck = new Deck(req.body)
    //Lay user tu userID
    const user = await User.findById(userID)
    //Gan owner cho deck moi tao
    newDeck.owner = user
    //Luu deck moi tao
    await newDeck.save()
    //Them deck moi vao danh sach deck cua user
    user.decks.push(newDeck._id)
    //Luu user
    await user.save()
    res.status(201).json({deck: newDeck})
}
const replaceUser = async (req, res, next) =>{
    const { userID  } = req.params

    const newUser = req.body

    const result = await User.findByIdAndUpdate( userID , newUser)

    return res.status(200).json({success: result})
}
const updateUser = async (req, res, next) =>{
    const { userID  } = req.params

    const newUser = req.body
    console.log('delete user', userID)
    const result = await User.findByIdAndUpdate( userID , newUser)

    return res.status(200).json({success: result})
}
const deleteUser = async (req, res, next) =>{
    const { userID  } = req.params 
    const result = await User.findByIdAndDelete(userID);
    console.log('delete user', userID)
    return res.status(200).json({message: 'User deleted successfully'})
}




module.exports = {
    index,
    newUser,
    getUser,
    replaceUser,
    updateUser,
    getUserDecks,
    newUserDeck,
    deleteUser
}