const express = require("express")
const router = express.Router();

//importowanie kontrolera
const AdminController = require("../controllers/admins")


router.post("/signup", AdminController.admins_add_new)//zakladanie konta

router.put("/login", AdminController.admins_login)//logowanie uzytkownika



module.exports = router