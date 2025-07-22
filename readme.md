# Library Management API (Express + Mongoose + TypeScript)

## Features

- Add new books to the library
- Retrieve all books with optional:
- Filtering by genre
- Sorting by field
- Limit result count
- Get a single book by ID
- Update book details
- Delete books from the system
- Mongoose schema validation


## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/aticmahbub/library-management-api-mongoose.git
cd library-management-api-mongoose
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library-management-api-mongoose
```

### 4. Run the Server

Development:
```bash
npm run dev
```
Production:
```bash
npm run build
npm start
```
## API Endpoints

### Add a New Book
```bash
POST /api/books
```
Request Body:
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "FANTASY",
  "isbn": "9780547928227",
  "description": "A fantasy novel by J.R.R. Tolkien",
  "copies": 10
}
```
Get All Books
```bash
GET /api/books
```
Get a Single Book
```bash
GET /api/books/:bookId
```
### Update a Book
```bash
PUT /api/books/:bookId
```
### Delete a Book
```bash
DELETE /api/books/:bookId
```
### Borrow book
```bash
POST /api/borrow
```
### Borrowed Books Summary (Using Aggregation)
```bash
GET /api/borrow
```

## Author

Atic Mahbub  
contact@aticmahbub.com  
[www.aticmahbub.com](http://www.aticmahbub.com)
