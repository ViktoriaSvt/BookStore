
import { useForm } from "../../../hooks/useForm";
import { createBook } from "../../../api/book-requests";
import axios from "axios";
import { useState } from "react";

const AddBookModal = ({ isOpen, closeModal }) => {

  const defaultValues = {
    title: "",
    genre: "",
    author: "",
    year: "",
    price: "",
    description: "",
    quantity: "",
  };

  const submitCallback = async () => {

    const token = localStorage.getItem('jwtToken');

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("genre", values.genre);
    formData.append("description", values.description);
    formData.append("year", values.year);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("bannerImage", bannerImage);
    formData.append("coverImage", coverImage);

    try {
      await axios.post("http://localhost:8085/api/books/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      closeModal();
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  let { values, changeHandler, submitHandler } = useForm(defaultValues, submitCallback)
  const [bannerImage, setBannerImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const handleFileChange = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  if (!isOpen) return null;

  return (
   <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">

<div className="bg-white p-8 rounded-lg w-full max-w-2xl xl:max-w-2xl mb-16">

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
            <label htmlFor="bannerImage" className="block text-sm font-bold mb-2">
              Banner Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="bannerImage"
                name="bannerImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBannerImage)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <button className="w-full px-4 py-2 border rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none">
                Select Banner Image
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-sm font-bold mb-2">
              Cover Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setCoverImage)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <button className="w-full px-4 py-2 border rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none">
                Select Cover Image
              </button>
            </div>
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
              name="quantity"
              value={values.quantity}
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
