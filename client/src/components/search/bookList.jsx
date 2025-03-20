import { addToCart } from "../../api/cart-requests";
import { useGetAllBooks } from "../../hooks/useBooks";
import "react-toastify/dist/ReactToastify.css";
import BookItem from "./book-item/BookItem";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { deleteBooks, getBooksBySearch } from "../../api/book-requests";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";


export default function Search() {
  const [books, setBooks] = useGetAllBooks();
  const [selectedBooks, setSelectedBooks] = useState([]);  // storing only IDs
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { isAdmin } = useAuthContext();

  const submitToCartHandler = async (bookId, data) => {
    try {
      await addToCart(bookId, data);
      toast.success("Added to cart", {
        position: "top-right",
      });
    } catch {
      toast.error("Please Login first.", {
        position: "top-right",
      });
    }
  };

  const searchCallback = async (searchQuery) => {
    if (searchQuery.params != null) {
      const response = await getBooksBySearch(searchQuery);
      setBooks(response);
    }
  };

  const { values, changeHandler, submitHandler } = useForm({ params: "" }, searchCallback);

  const toggleSelectBook = (book) => {
    const isSelected = selectedBooks.includes(book.id);
    if (isSelected) {
      setSelectedBooks(selectedBooks.filter((id) => id !== book.id));
    } else {
      setSelectedBooks([...selectedBooks, book.id]);
    }

    setShowDeleteButton(selectedBooks.length >= 0);
  };

  const handleDelete = async () => {
    await deleteBooks(selectedBooks);
    setSelectedBooks([]);
    setShowDeleteButton(false);
  };

  const handleCancel = async () => {
    setSelectedBooks([]);
    setShowDeleteButton(false);
  };


  return (
    <>
      <ToastContainer />
      <div className="search">
        <form role="form" action="/search" method="get" onSubmit={submitHandler}>
          <input
            type="text"
            className="rounded-[30px]"
            name="params"
            id="search-bar"
            placeholder="Search for books..."
            aria-label="Search for books"
            value={values.params}
            onChange={changeHandler}
          />
        </form>
      </div>

      <div className="flex flex-wrap justify-center mb-40">
        {books.map((currentBook) => (
          <BookItem
            key={currentBook.id}
            book={currentBook}
            submitHandler={() => submitToCartHandler(currentBook.id, currentBook)}
            toggleSelect={() => isAdmin && toggleSelectBook(currentBook)}
            isSelected={selectedBooks.includes(currentBook.id)}
            isAdmin={isAdmin}
          />
        ))}
      </div>

      {isAdmin && showDeleteButton && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-center items-center z-7">
          <div className="flex items-center justify-between w-full max-w-[400px] bg-gray-100 p-4 rounded-lg shadow-lg ">
            <p className="text-gray-800 font-medium text-center">Delete selected books?</p>
            <div className="flex flex-col sm:flex-row sm:space-x-2 sm:justify-center mt-3 sm:mt-0">
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-500 focus:ring-0 border-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 sm:mb-0 "
              >
                Delete
              </button>

              <button
                onClick={handleCancel}
                className="text-gray-800 bg-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <div></div>
    </>
  );
}
