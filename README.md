# Biblioteczne API - Backend

## Opis

**Biblioteczne API** to backendowa aplikacja do zarządzania biblioteką, która umożliwia rejestrację użytkowników, zarządzanie książkami, wypożyczeniem książek oraz administracją systemu. Aplikacja bazuje na technologii Node.js z wykorzystaniem Express i MongoDB.

### Funkcje

- **Administracja**
  - Rejestracja nowych administratorów
  - Logowanie i autoryzacja administratorów za pomocą JWT
- **Użytkownicy**
  - Dodawanie nowych użytkowników
  - Edycja danych użytkowników
  - Usuwanie użytkowników
  - Pobieranie listy użytkowników oraz szczegółów o konkretnym użytkowniku
  - Wypożyczanie książek i śledzenie historii wypożyczeń
- **Książki**
  - Dodawanie nowych książek do biblioteki
  - Edycja książek
  - Usuwanie książek
  - Pobieranie szczegółów o książkach
  - Sprawdzanie dostępnych książek
- **Wypożyczenia**
  - Rejestrowanie wypożyczeń książek
  - Zwrot książek
  - Śledzenie wypożyczeń na poziomie użytkownika

## Technologie

- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens) do autoryzacji
- Mongoose

## API Endpoints

### Admini
- **POST** /admins/signup - Rejestracja nowego administratora
- **PUT** /admins/login - Logowanie administratora i uzyskiwanie tokenu JWT

### Użytkownicy
- **GET** /users - Pobierz listę wszystkich użytkowników
- **POST** /users - Dodaj nowego użytkownika
- **GET** /users/:userId - Pobierz szczegóły użytkownika
- **PUT** /users/:userId - Zaktualizuj dane użytkownika
- **DELETE** /users/:userId - Usuń użytkownika

### Książki
- **GET** /books - Pobierz listę wszystkich książek
- **POST** /books - Dodaj nową książkę (autoryzacja wymagania)
- **GET** /books/:bookId - Pobierz szczegóły książki
- **PUT** /books/:bookId - Zaktualizuj książkę
- **DELETE** /books/:bookId - Usuń książkę

### Wypożyczenia
- **POST** /borrowings - Dodaj wypożyczenie książki
- **PUT** /borrowings/return - Zwróć książkę
- **GET** /borrowings/borrowedBooks - Pobierz listę wypożyczonych książek przez użytkownika


### POST /admins/signup
- Opis: Tworzenie nowego konta administratora
- Body:
{
    "email": "admin@example.com",
    "password": "securePassword"
}
- Response:
{
    "wiadomosc": "Dodano admina"
}

### PUT /admins/login
- Opis: Logowanie administratora i uzyskanie tokenu JWT
- Body:
{
    "email": "admin@example.com",
    "password": "securePassword"
}
- Response:
{
    "token": "jwt_token"
}

### GET /books
- Opis: Pobranie listy wszystkich książek
- Response:
{
    "wiadomość": "lista wszystkich ksiązek",
    "lista": [
        {
            "_id": "book_id",
            "title": "Book Title",
            "author": "Book Author",
            "genre": "Book Genre",
            "copiesAvailable": 5
        },
        ...
    ]
}

### POST /books
- Opis: Dodanie nowej książki (wymaga autoryzacji)
- Body:
{
    "title": "New Book Title",
    "author": "New Book Author",
    "genre": "New Genre",
    "copiesAvailable": 10
}
- Response:
{
    "wiadomość": "dodanie nowej ksiazki",
    "dane": {
        "_id": "new_book_id",
        "title": "New Book Title",
        "author": "New Book Author",
        "genre": "New Genre",
        "copiesAvailable": 10
    }
}

### GET /books/:bookId
- Opis: Pobranie szczegółów konkretnej książki
- Response:
{
    "wiadomość": "Szczegóły ksiązki o numerze bookId",
    "dane": {
        "_id": "book_id",
        "title": "Book Title",
        "author": "Book Author",
        "genre": "Book Genre",
        "copiesAvailable": 5
    }
}

### PUT /books/:bookId
- Opis: Aktualizacja danych książki (wymaga autoryzacji)
- Body:
{
    "title": "Updated Book Title",
    "author": "Updated Book Author",
    "genre": "Updated Genre",
    "copiesAvailable": 8
}
- Response:
{
    "wiadomość": "Zmiana danych ksiązki o numerze bookId"
}

### DELETE /books/:bookId
- Opis: Usunięcie książki (wymaga autoryzacji)
- Response:
{
    "wiadomość": "Usunięcie ksiazki o numerze bookId"
}

### POST /borrowings
- Opis: Dodanie nowego wypożyczenia (wymaga autoryzacji)
- Body:
{
    "bookId": "book_id",
    "userId": "user_id"
}
- Response:
{
    "wiadomość": "Dodano nowe wypożyczenie",
    "dane": {
        "_id": "borrowing_id",
        "bookId": "book_id",
        "userId": "user_id",
        "borrowingDate": "2025-01-09T12:34:56.789Z",
        "returnDate": null
    }
}

### PUT /borrowings/return
- Opis: Zwrócenie książki (wymaga autoryzacji)
- Body:
{
    "bookId": "book_id",
    "userId": "user_id"
}
- Response:
{
    "wiadomość": "Książka zwrócona",
    "dane": {
        "_id": "borrowing_id",
        "bookId": "book_id",
        "userId": "user_id",
        "borrowingDate": "2025-01-09T12:34:56.789Z",
        "returnDate": "2025-01-09T13:00:00.000Z"
    }
}

### GET /borrowings/borrowedBooks
- Opis: Pobranie wypożyczonych książek przez użytkownika
- Body:
{
    "userName": "user_name"
}
- Response:
{
    "wiadomość": "Książki wypożyczone przez użytkownika user_name",
    "książki": [
        {
            "title": "Book Title",
            "author": "Book Author"
        },
        ...
    ]
}

### GET /users
- Opis: Pobranie listy wszystkich użytkowników (wymaga autoryzacji)
- Response:
{
    "wiadomość": "lista wszystkich uzytkownikow",
    "lista": [
        {
            "_id": "user_id",
            "name": "User Name",
            "email": "user@example.com",
            "borrowedBooks": ["Book Title 1", "Book Title 2"]
        },
        ...
    ]
}

### POST /users
- Opis: Dodanie nowego użytkownika (wymaga autoryzacji)
- Body:
{
    "name": "New User",
    "email": "newuser@example.com",
    "borrowedBooks": []
}
- Response:
{
    "wiadomość": "utworzenie nowego uzytkownika",
    "dane": {
        "_id": "new_user_id",
        "name": "New User",
        "email": "newuser@example.com",
        "borrowedBooks": []
    }
}

### GET /users/:userId
- Opis: Pobranie szczegółów użytkownika (wymaga autoryzacji)
- Response:
{
    "wiadomość": "Szczegóły uzytkownika o numerze userId",
    "dane": {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "borrowedBooks": ["Book Title 1", "Book Title 2"]
    }
}

### PUT /users/:userId
- Opis: Aktualizacja danych użytkownika (wymaga autoryzacji)
- Body:
{
    "name": "Updated User",
    "email": "updateduser@example.com",
    "borrowedBooks": ["Updated Book Title"]
}
- Response:
{
    "wiadomość": "Zmiana danych uzytkownika o numerze userId"
}

### DELETE /users/:userId
- Opis: Usunięcie użytkownika (wymaga autoryzacji)
- Response:
{
    "wiadomość": "Usunięcie uzytkownika o numerze userId"
}
