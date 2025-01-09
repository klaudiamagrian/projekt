const mongoose = require("mongoose")

//schemat uzytkownika
const userSchema = mongoose.Schema({
    //id nie trzeba wpisywać
    _id: mongoose.Types.ObjectId,
    name: String,
    email: String,
    borrowedBooks: [String]
})

module.exports = mongoose.model("User", userSchema)