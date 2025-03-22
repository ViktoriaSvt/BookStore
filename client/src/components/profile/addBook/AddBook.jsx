
import { useForm } from "../../../hooks/useForm";
import { createBook } from "../../../api/book-requests";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBookModal () {

  const navigate = useNavigate();
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



  return (
<div className="bg-gray-100 min-h-screen flex flex-wrap justify-center items-center overflow-auto pb-16 mb-16">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl xl:max-w-2xl mb-0 shadow-lg m-6 scale-90">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add a New Book</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4 scale-y-125">
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
              onClick={() => navigate("/search")}
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

      <div className="w-[250px] bg-[#f3f4f6] p-6 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-center mb-4">Preview</h4>
        <div className="bg-white shadow-lg rounded-xl w-[200px] m-2 group hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="relative">
            <img
              className="rounded-[0px] p-6 object-contain w-[200px] max-h-[280px] transition-all duration-300 transform group-hover:scale-110"
              src={coverImage ? URL.createObjectURL(coverImage) : "https://www.theseasonedhome.com/content/images/thumbs/default-image_450.png"}
              alt="product image"
            />
            <div className="w-[150px] absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-all duration-300 rounded-[0px] flex items-center justify-center text-white m-7">
              <div className="text-center px-4 p-10">
                <p className="text-lg font-semibold">{values.author}</p>
                <p className="text-sm">{values.year}</p>
                <p className="text-sm pb-[10px]">Genre: {values.genre}</p>
                <p className="text-sm">
                  {values.description.length > 200 ? values.description.substring(0, 200) + "..." : values.description}
                </p>
              </div>
            </div>
          </div>
          <div className="px-5 pb-5 relative z-10">
            <h3 className="text-gray-900 font-semibold text-lg tracking-tight mb-2 group-hover:text-[#4C6EF5] transition-all duration-300">
              {values.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">${values.price}</span>
              <button
                className="text-white bg-[#4C6EF5] hover:bg-[#3A5CE0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
                disabled
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

