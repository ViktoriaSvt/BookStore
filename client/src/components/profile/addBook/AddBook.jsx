import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { createBook } from "../../../api/book-requests";

const AddBookModal = ({ isOpen, closeModal }) => {

  const defaultValues = {
    title: "",
    genre: "",
    author: "",
    bannerImageUrl: "",
    coverImageUrl: "",
    year: "",
    price: "",
    description: "",
    inStock: 0,
  };

  const submitCallback = async () => {
    await createBook(values)
    closeModal();
  };

  let { values, changeHandler, submitHandler } = useForm(defaultValues, submitCallback)


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={changeHandler}
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
              value={values.author}
              onChange={changeHandler}
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
              value={values.genre}
              onChange={changeHandler}
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
              value={values.description}
              onChange={changeHandler}
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
              value={values.bannerImageUrl}
              onChange={changeHandler}
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
              value={values.coverImageUrl}
              onChange={changeHandler}
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
              value={values.year}
              onChange={changeHandler}
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
              value={values.price}
              onChange={changeHandler}
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
              value={values.inStock}
              onChange={changeHandler}
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
