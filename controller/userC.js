// Import một hàm (không dùng trong file này) từ mongoose
const { get } = require('mongoose');
// Import model User từ thư mục model
const User = require('../model/User');
// Import model Deck từ thư mục model
const Deck = require('../model/Deck');
// Import Joi để validate (hiện tại không dùng)
const Joi = require('joi');

// Ví dụ schema Joi (bị comment vì không sử dụng)
// const idSchema: Joi.object().keys({
//     param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()})

// Ví dụ dùng Promise (bị comment vì dùng async/await)
// const index = (req, res, next) =>{
//     User.find({}).then((users)=>{
//         return res.status(201).json({users})
// }).catch(err=>next(err))}

// Phiên bản khác bị comment (giữ lại để tham khảo)
// const index = async (req, res, next) => {
// const users = await User.find({});
//     return res.status(200).json({users})
//   };

/*
    Các controller thực tế
*/

// Lấy thông tin 1 user theo userID (GET /users/:userID)
const getUser = async (req, res, next) => {
  try {
    // Lấy userID từ params của request
    const { userID } = req.value.params;
    // Tìm user theo id trong DB bằng model User
    const user = await User.findById(userID);
    // In ra console để debug
    console.log('user info', user);
    // Trả về thông tin user với status 200
    return res.status(200).json({ user });
  } catch (error) {
    // Nếu có lỗi, chuyển cho middleware xử lý lỗi
    next(error);
  }
};

// Lấy danh sách decks của một user (GET /users/:userID/decks)
const getUserDecks = async (req, res, next) => {
  try {
    // Lấy userID từ params
    const { userID } = req.value.params;
    // Tìm user và populate trường 'decks' (join)
    const user = await User.findById(userID).populate('decks'); //ten truong muon join
    // In ra danh sách decks để debug
    console.log('user info', user.decks);
    // Trả về danh sách decks của user
    return res.status(200).json({ decks: user.decks });
  } catch (error) {
    // Chuyển lỗi cho middleware xử lý
    next(error);
  }
};

// Lấy danh sách tất cả users (GET /users)
const index = async (req, res, next) => {
  try {
    // Tìm tất cả users trong DB
    const users = await User.find({});
    // Trả về danh sách users
    return res.status(200).json({ users });
  } catch (error) {
    // Chuyển lỗi
    next(error);
  }
};

// Tạo user mới (POST /users)
const newUser = async (req, res, next) => {
  try {
    // Tạo instance User mới từ body request
    const newUser = new User(req.value.body);
    // Lưu user mới vào DB
    const savedUser = await newUser.save();
    // Trả về user đã lưu với status 201
    return res.status(201).json(savedUser);
  } catch (error) {
    // Chuyển lỗi
    next(error);
  }
};

// Tạo deck mới cho một user (POST /users/:userID/decks)
const newUserDeck = async (req, res, next) => {
  try {
    // Lấy userID từ params
    const { userID } = req.params;

    // Tạo deck mới từ body request
    const newDeck = new Deck(req.body);
    // Tìm user theo id để gán owner
    const user = await User.findById(userID);
    // Gán owner cho deck mới (có thể lưu cả object hoặc id tùy schema)
    newDeck.owner = user;
    // Lưu deck mới vào DB
    await newDeck.save();
    // Thêm id deck mới vào mảng decks của user
    user.decks.push(newDeck._id);
    // Lưu lại user sau khi cập nhật mảng decks
    await user.save();
    // Trả về deck mới tạo
    return res.status(201).json({ deck: newDeck });
  } catch (error) {
    // Chuyển lỗi
    next(error);
  }
};

// Thay thế toàn bộ thông tin user (PUT /users/:userID)
const replaceUser = async (req, res, next) => {
  try {
    // Lấy userID từ params
    const { userID } = req.value.params;
    // Dữ liệu mới từ body
    const newUser = req.value.body;
    // Cập nhật user theo id (findByIdAndUpdate trả về document cũ theo mặc định)
    const result = await User.findByIdAndUpdate(userID, newUser);
    // Trả về kết quả (thường là document trước khi update)
    return res.status(200).json({ success: result });
  } catch (error) {
    // Chuyển lỗi
    next(error);
  }
};

// Cập nhật một phần user (PATCH /users/:userID)
const updateUser = async (req, res, next) => {
  try {
    // Lấy userID từ params
    const { userID } = req.value.params;
    // Lấy dữ liệu cập nhật từ body
    const newUser = req.value.body;
    // In ra console để debug
    console.log('delete user', userID);
    // Cập nhật user (tương tự replace, tuỳ ý có thể dùng { new: true } để trả về doc mới)
    const result = await User.findByIdAndUpdate(userID, newUser);
    // Trả về kết quả
    return res.status(200).json({ success: result });
  } catch (error) {
    // Chuyển lỗi
    next(error);
  }
};

// Xóa user (DELETE /users/:userID)
const deleteUser = async (req, res, next) => {
  try {
    // Lấy userID từ params
    const { userID } = req.value.params;
    // Xóa user theo id
    const result = await User.findByIdAndDelete(userID);
    // In ra console để debug
    console.log('delete user', userID);
    // Trả về thông báo thành công
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Chuyển lỗi
    next(error);
  }
};

// Export các hàm để route sử dụng
module.exports = {
  index,
  newUser,
  getUser,
  replaceUser,
  updateUser,
  getUserDecks,
  newUserDeck,
  deleteUser,
};
