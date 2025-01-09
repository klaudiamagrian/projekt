const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin");


//zakladanie konta
exports.admins_add_new = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).json({wiadomosc: err})

        const admin = new Admin ({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash

    })
    admin
    .save()
    .then(() => res.status(201).json({wiadomosc:"Dodano admina"}))
    })
}

//logowanie
exports.admins_login = (req, res, next) => {
    //najpierw sprawdzam czy jest taki login
    Admin.findOne({email: req.body.email})
    .then(admin => {
        //jezeli jest to pobieram obiekt admina
        if(!admin) return res.status(401).json({wiadomosc:"Błąd autoryzacji"})
        //weryfikuje hasha 
        bcrypt.compare(req.body.password, admin.password, (err, result) => {
            if(err) return res.status(500).json({wiadomosc:"err"})
            if(!result) return res.status(401).json({wiadomosc:"Błąd autoryzacji"})
            //jak jest ok to pokazuje zwracam JWT
            const token = jwt.sign({admin: admin._id, email: admin.email}, process.env.JWT_KEY, {expiresIn:"1d"})
            return res.status(200).json(token)
        });
    });
    
    
};