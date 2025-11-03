const User = require("../model/User");

//PROMISE 
// const index = (req, res, next) =>{
//     User.find({}).then((users)=>{
//         return res.status(201).json({users})
// }).catch(err=>next(err))}

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
    console.log('req.body content ', req.body)
    const newUser = new User(req.body) 

   const { email } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.log('newUser', newUser)
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser)
}

module.exports = {
    index,
    newUser,
}