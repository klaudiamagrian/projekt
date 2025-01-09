const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    try {
            jwt.verify(token, process.env.JWT_KEY)
                next()}
                catch(err) {
                    return res.status(401).json({wiadomosc:"Błąd autoryzacji"})
                }


    }
