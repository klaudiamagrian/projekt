const express = require("express")
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler 
const UserController = require("../controllers/users")

router.get("/", checkAuth, UserController.users_get_all)//wyswietlam liste uzytkownikow

router.post("/", checkAuth, UserController.users_add_new)//dodaje nowego uzytkownika

router.get("/:userId", checkAuth, UserController.users_get_by_id)//wyswietlam info o danym uzytkowniku

router.put("/:userId", checkAuth, UserController.users_update)//zmieniam dane danego uzytkownika

router.delete("/:userId", checkAuth, UserController.users_delete)//usuwam uzytkownika

module.exports = router