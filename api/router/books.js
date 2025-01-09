const express = require("express")
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler 
const BookController = require("../controllers/books")

router.get("/", BookController.books_get_all)//wyswietla liste ksiazek

router.post("/", checkAuth, BookController.books_add_new)//dodaje nowa ksiazke

router.get("/:bookId", BookController.books_get_by_id)//wyswietlam info o danej ksiazce

router.put("/:bookId", checkAuth, BookController.books_update)//zmieniam info o danej ksiazce

router.delete("/:bookId", checkAuth, BookController.books_delete)//usuwam ksiazke

module.exports = router