const mongoose = require("mongoose")

//schemat admina
const adminSchema = mongoose.Schema({
    //id nie trzeba wpisywać
    _id: mongoose.Types.ObjectId,
    email: String,
    password: String
})

module.exports = mongoose.model("Admin", adminSchema)