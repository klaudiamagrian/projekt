const mongoose = require("mongoose")

//schemat produktu
const bookSchema = mongoose.Schema({
    //id nie trzeba wpisywać
    _id: mongoose.Types.ObjectId,
    title: String,
    author: String,
    genre: String,
    copiesAvailable: Number
})

module.exports = mongoose.model("Book", bookSchema)

