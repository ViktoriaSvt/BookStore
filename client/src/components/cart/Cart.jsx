
import { removeItem } from "../../api/cart-requests";
import Item from "./item/Item";
import StripePayment from "./checkout/Checkout";
import { useGetCart, useGetTotalPrice } from "../../hooks/useCart";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Cart() {
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const books = useGetCart(refresh);
  const totalAmount = useGetTotalPrice(books);

  const removeButtonHandler = async (bookId) => {
    
    await removeItem(bookId);
    setRefresh(prev => !prev);
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setRefresh(prev => !prev);
    setIsModalOpen(false);
    
  }

  console.log('in cart', books);
  

  return (
    <div className="relative overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-800 m-10 p-8">

      <table className="w-full text-sm text-left rtl:text-right text-gray-1000 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-8 py-4">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-4">Product</th>
            <th scope="col" className="px-6 py-4">Price</th>
            <th scope="col" className="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? books.map(book => (
            <Item
              key={book.bookId}
              book={book}
              removeButtonHandler={() => removeButtonHandler(book.bookId)}
            />
          )) : (
            <tr>
            <td colSpan="4" className="text-center py-4 text-lg font-semibold text-gray-600">
              <div className="mb-2 flex justify-center">
                <i className="fa-solid fa-circle-question text-gray-400 text-5xl mb-4"></i>
              </div>
              No items in cart
            </td>
          </tr>
          
          )}
        </tbody>
      </table>


      {books.length > 0 && (
        <div className="mt-6 flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total: ${totalAmount.toFixed(2)}
          </span>
          <button
            onClick={openModal}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      )}


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
              <button
                onClick={closeModal}
                className="text-xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <ToastContainer />
            <StripePayment totalAmount={totalAmount} books={books}/>
          </div>
        </div>
      )}
    </div>
  );
}
