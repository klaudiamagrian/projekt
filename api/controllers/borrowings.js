const mongoose = require("mongoose");
const Borrowing = require("../models/borrowing");
const Book = require("../models/book");
const User = require("../models/user");

// Dodaje wypożyczenie
exports.borrowing_create_new = (req, res) => {
  const { bookId, userId } = req.body;

  //znajduje ksiazke
  Book.findById(bookId)
    .then((book) => {
      if (!book || book.copiesAvailable <= 0) {
        return res.status(400).json({ wiadomość: "Książka niedostępna" });
      }
      //aktualizuje ilosc ksiazek w bibliotece
      book.copiesAvailable -= 1;
      return book.save();
    })
    //tworze obiekt bazodanowy
    .then(() => {
      const borrowing = new Borrowing({
        bookId,
        userId,
        borrowingDate: new Date(),
      });
      return borrowing.save();
    })
    .then((borrowing) => {
      // Dodanie książki do listy wypożyczonych książek użytkownika
      return User.findById(borrowing.userId)
        .then((user) => {
          if (!user) throw new Error("Nie znaleziono użytkownika");
          return Book.findById(borrowing.bookId).then((book) => {
            if (!book) throw new Error("Nie znaleziono książki");
            user.borrowedBooks.push(book.title); // Dodanie tytułu książki
            return user.save().then(() => borrowing);
          });
        });
    })
    .then((borrowing) => {
      return Borrowing.findById(borrowing._id)
        .populate("bookId", "title") // Pobieramy tytuł książki
        .populate("userId", "name") // Pobieramy nazwę użytkownika
        .exec();
    })
    .then((borrowing) => {
      res.status(201).json({
        wiadomość: "Dodano nowe wypożyczenie",
        dane: borrowing,
      });
    })
    .catch((err) => res.status(500).json({ wiadomość: err.message }));
};

// Zwrot książki
exports.borrowing_return = (req, res) => {
  const { bookId, userId } = req.body;

  // Znajduje wypożyczenie książki dla danego użytkownika, które nie zostało jeszcze zwrócone
  Borrowing.findOne({ bookId, userId, returnDate: null })
    .then((borrowing) => {
      if (!borrowing) {
        throw new Error("Nieprawidłowe wypożyczenie");
      }
      // tworze datę zwrotu
      borrowing.returnDate = new Date();
      return borrowing.save();
    })
    .then((borrowing) => {
      // Zwiększam dostępność książki w bazie
      return Book.findById(borrowing.bookId).then((book) => {
        if (!book) throw new Error("Nie znaleziono książki");
        book.copiesAvailable += 1;
        return book.save().then(() => borrowing);
      });
    })
    .then((borrowing) => {
      // Usuwam książkę z listy wypożyczonych książek użytkownika
      return User.findById(borrowing.userId).then((user) => {
        if (!user) throw new Error("Nie znaleziono użytkownika");

        // Usuwam tytuł książki z borrowedBooks
        return Book.findById(borrowing.bookId).then((book) => {
          user.borrowedBooks = user.borrowedBooks.filter(
            (title) => title !== book.title
          );
          return user.save().then(() => borrowing);
        });
      });
    })
    .then((borrowing) => {
      // Pobieram szczegóły wypożyczenia, aby zwrócić szczegółowe dane
      return Borrowing.findById(borrowing._id)
        .populate("bookId", "title")
        .populate("userId", "name")
        .exec();
    })
    .then((borrowing) => {
      res.status(200).json({
        wiadomość: "Książka zwrócona",
        dane: borrowing,
      });
    })
    .catch((err) => res.status(500).json({ wiadomość: err.message }));
};


//Pokazanie wypozyczen danego uzytkownika
exports.getBorrowedBooksByUsername = (req, res) => {
  const { userName } = req.body;

  // Znalezienie użytkownika po nazwie
  User.findOne({ name: userName })
    .then((user) => {
      if (!user) {
        throw new Error("Nie znaleziono użytkownika");
      }

      // Pobranie szczegółów książek na podstawie ich tytułów
      return Book.find({ title: { $in: user.borrowedBooks } }).then((books) => ({
        user,
        books,
      }));
    })
    .then(({ user, books }) => {
      res.status(200).json({
        wiadomość: `Książki wypożyczone przez użytkownika ${user.name}`,
        książki: books.map((book) => ({
          title: book.title,
          author: book.author,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({ wiadomość: err.message });
    });
};
