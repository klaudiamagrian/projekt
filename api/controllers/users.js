const mongoose = require("mongoose")
//importuje model
const User = require("../models/user")

//wyswietlam wszystkich uzytkownikow
exports.users_get_all = (req, res, next) => {
    User.find().then(users => {
        res.status(200).json({
            wiadomość: "lista wszystkich uzytkownikow",
            lista: users
        })
    }).catch(err=> res.status(500).json({wiadomość: err}))
}

exports.users_add_new = (req, res, next) => {
    //tworze obiekt bazodanowy
    const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        borrowedBooks: req.body.borrowedBooks || []
    })
    //zapisuje do bazy
    user.save()
    .then(result=> {
        res.status(201).json({
        wiadomość: "utworzenie nowego uzytkownika",
        dane: result
        })
    })
    .catch(err=> res.status(500).json({wiadomość: err}))
}

//wyswietlam danego uzytkownika
exports.users_get_by_id = (req, res, next) => {
    const id = req.params.userId
    User.findById(id)
    .then(result=> {
        res.status(200).json({
            wiadomość: "Szczegóły uzytkownika o numerze " + id,
            dane: result
        })
    })
    .catch(err=> res.status(500).json({wiadomość: err}))

}

//zmieniam informacje o danym uzytkowniku
exports.users_update = (req, res, next) => {
    const id = req.params.userId
    User.findByIdAndUpdate(id, {name:req.body.name, email: req.body.email, borrowedBooks: req.body.borrowedBooks || []})
    .then(()=> { 
    res.status(200).json({wiadomość: "Zmiana danych uzytkownika o numerze " + id})
    })
}

//usuwam danego uzytkownika
exports.users_delete = (req, res, next) => {
    const id = req.params.userId
    User.findOneAndDelete(id)
    .then(()=> {
        res.status(200).json({wiadomość: "Usunięcie uzytkownika o numerze " + id})
    })
}

