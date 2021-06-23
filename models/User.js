const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    name: String,
    age: Number,
    profession: String,
    hobbies:[String]

})
module.exports = mongoose.model('User',userShema)