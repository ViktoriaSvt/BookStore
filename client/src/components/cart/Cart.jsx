
import { useEffect, useState } from "react";
import { removeItem } from "../../api/cart-requests";
import { useGetCart } from "../../hooks/useGetCart";
import Item from "./item/Item";
import StripePayment from "./checkout/Checkout";

export default function Cart() {
  const [refresh, setRefresh] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const books = useGetCart(refresh);

  const removeButtonHandler = async (bookId) => {
    await removeItem(bookId);
    setRefresh(prev => !prev);
  };

  useEffect(() => {
    const total = books.reduce((sum, book) => sum + book.price, 0);
    setTotalAmount(total);
}, [books]);

const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);


  console.log(totalAmount);
  



  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-1000 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 && books.map(book => (
            <Item
              key={book._id}
              book={book}
              removeButtonHandler={() => removeButtonHandler(book._id)}
            />
          ))}
        </tbody>
      </table>

        {/* Checkout Button */}
        {books.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">
            Total: ${totalAmount.toFixed(2)}
          </span>
          <button
            onClick={openModal}
            className="px-6 py-3 text-white bg-blue-600 font-semibold rounded-lg transition-colors hover:bg-blue-700"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Complete Your Payment</h2>
              <button
                onClick={closeModal}
                className="text-xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <StripePayment totalAmount={totalAmount} />
            </div>
          </div>
        </div>
      )}

      {books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-3xl font-semibold text-gray-500 mb-4">
            No items in cart
          </h1>
          <i className="fa-solid fa-person-circle-exclamation text-5xl text-gray-400"></i>
        </div>
      )}
    </div>

  );
}