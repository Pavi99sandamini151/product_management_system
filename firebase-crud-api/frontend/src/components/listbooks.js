import React, { useEffect, useState } from "react";
import axios from "axios";

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fir-crud-3aa9c/us-central1/app/api/read");
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>{book.name}</h2>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Link: {book.link}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListBooks;