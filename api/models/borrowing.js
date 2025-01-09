const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Referencja do książki
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Referencja do użytkownika
  borrowingDate: { type: Date, default: Date.now },
  returnDate: { type: Date, default: null },
});

module.exports = mongoose.model("Borrowing", borrowingSchema);