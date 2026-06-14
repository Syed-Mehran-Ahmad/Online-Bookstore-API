# 📚 Online Bookstore API

A RESTful API built using **Node.js, Express, and MongoDB** for managing an online bookstore system.  
This project allows users to perform full CRUD operations on books with search and pagination features.

---

## 👨‍💻 Author
**Syed Mehran Ahmad**

---

## 🚀 Features

- Add new books
- Get all books
- Get book by ID
- Update book details
- Delete books
- Search books by author or genre
- Pagination support
- Request logging middleware
- Error handling for invalid routes

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## 📡 API Endpoints

### Books Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /books | Get all books |
| GET | /books/:id | Get single book |
| POST | /books | Add new book |
| PUT | /books/:id | Update book |
| DELETE | /books/:id | Delete book |
