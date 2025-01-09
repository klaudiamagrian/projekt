// zmienne środowiskowe
require('dotenv').config()

// importuje expressa
const express = require("express")

// tworzę instancję expressa
const app = express()

const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${process.env.DBD_USER}:${process.env.DBD_PASSWORD}@klaudia.tut6z.mongodb.net/${process.env.DBD_NAME}?retryWrites=true&w=majority&appName=Klaudia`)

//logger
const morgan = require("morgan")
app.use(morgan("dev"))

//parsowanie body
const bodyParser = require("body-parser")
app.use(bodyParser.json()) //od tej pory req.body mam informacje z części body

// importuje routy
const booksRoutes = require("./api/router/books")
const usersRoutes = require("./api/router/users")
const adminsRoutes = require("./api/router/admins")
const borrowingsRoutes = require("./api/router/borrowings")


// stosuje te routy
app.use("/books", booksRoutes)
app.use("/users", usersRoutes)
app.use("/admins", adminsRoutes)
app.use("/borrowings", borrowingsRoutes)

//błąd routu
app.use((req, res, next) => { // jak ktoś poprosi o coś serwer to dzieje się to co w linijce 8
    res.status(404).json({wiadomość: "Not found"})
})


module.exports = app