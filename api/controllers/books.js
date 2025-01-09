const mongoose = require("mongoose")
//importuje model
const Book = require("../models/book")

//wyswielam liste wszystkich ksiazek
exports.books_get_all = (req, res, next) => {
    Book.find().then(books => {
        res.status(200).json({
            wiadomość: "lista wszystkich ksiązek",
            lista: books
        })
    }).catch(err=> res.status(500).json({wiadomość: err}))
}

exports.books_add_new = (req, res, next) => {
    //tworze obiekt bazodanowy
    const book = new Book ({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        copiesAvailable: req.body.copiesAvailable
    })
    //zapisuje do bazy
    book.save()
    .then(result=> {
        res.status(201).json({
        wiadomość: "dodanie nowej ksiazki",
        dane: result
        })
    })
    .catch(err=> res.status(500).json({wiadomość: err}))
}

//wyswietlam informacje o danej ksiazce
exports.books_get_by_id = (req, res, next) => {
    const id = req.params.bookId
    Book.findById(id)
    .then(result=> {
        res.status(200).json({
            wiadomość: "Szczegóły ksiązki o numerze " + id,
            dane: result
        })
    })
}

//zmeiniam dane danej ksiazki
exports.books_update = (req, res, next) => {
    const id = req.params.bookId
    Book.findByIdAndUpdate(id, {title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        copiesAvailable: req.body.copiesAvailable})
    .then(()=> { 
    res.status(200).json({wiadomość: "Zmiana danych ksiązki o numerze " + id})
    })
}


//usuwam dana ksiazke
exports.books_delete = (req, res, next) => {
    const id = req.params.bookId
    Book.findOneAndDelete(id)
    .then(()=> {
        res.status(200).json({wiadomość: "Usunięcie ksiazki o numerze " + id})
    })
} 
