const express = require('express');
const router = express.Router();
//autoryzacja
const checkAuth = require("../middleware/checkAuth")

//importuje kontroler 
const BorrowingController = require("../controllers/borrowings")

router.post('/', checkAuth, BorrowingController.borrowing_create_new); //dodaje wypozyczenie
router.put('/return', checkAuth, BorrowingController.borrowing_return); //zwracam ksiazke
router.get("/borrowedBooks", checkAuth, BorrowingController.getBorrowedBooksByUsername);//pokazuje wypozyczenia uzytkownika

module.exports = router;