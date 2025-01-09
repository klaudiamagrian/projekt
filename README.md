# Biblioteczne API - Backend

## Opis

**Biblioteczne API** to backendowa aplikacja do zarządzania biblioteką, która umożliwia rejestrację użytkowników, zarządzanie książkami, wypożyczaniem książek oraz administracją systemu. Aplikacja bazuje na technologii Node.js z wykorzystaniem Express i MongoDB.

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

## Instalacja

1. Sklonuj repozytorium:
