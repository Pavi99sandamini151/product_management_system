import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
    const [formData, setFormData] = useState({
      name: "",
      isbn: "",
      author: "",
      link: "",
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await axios.post("http://localhost:5000/fir-crud-3aa9c/us-central1/app/api/create", formData);
        console.log("Book created successfully");
        // Do any additional logic or redirect after successful submission
      } catch (error) {
        console.log(error);
        // Handle error state or display error message to the user
      }
    };
  
    return (
      <div>
        <h2>Create Book</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            ISBN:
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </label>
          <label>
            Link:
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default AddBook;