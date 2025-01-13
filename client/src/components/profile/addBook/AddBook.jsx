import React, { useState } from "react";

const AddBookModal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    author: "",
    bannerImageUrl: "",
    coverImageUrl: "",
    year: "",
    price: "",
    description: "",
    inStock: 0, // New field for stock quantity
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // You would typically send the form data to the server here
      // Example:
      // await api.createBook(formData);

      console.log("Book data submitted: ", formData);

      // Close the modal after submitting
      closeModal();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-bold mb-2">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bannerImageUrl" className="block text-sm font-bold mb-2">
              Background Image URL
            </label>
            <input
              type="text"
              id="bannerImageUrl"
              name="bannerImageUrl"
              value={formData.bannerImageUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="coverImageUrl" className="block text-sm font-bold mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              id="coverImageUrl"
              name="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-bold mb-2">
              Year of Publication
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              min="2000"
              max="2100"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="inStock" className="block text-sm font-bold mb-2">
              In Stock
            </label>
            <input
              type="number"
              id="inStock"
              name="inStock"
              value={formData.inStock}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              min="0"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
