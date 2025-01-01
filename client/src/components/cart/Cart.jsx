
import { useState } from "react";
import { removeItem } from "../../api/cart-requests";
import { useGetCart } from "../../hooks/useGetCart";
import Item from "./item/Item";

export default function Cart() {
  const [refresh, setRefresh] = useState(false);
  const books = useGetCart(refresh);

  const removeButtonHandler = async (bookId) => {

    await removeItem(bookId);
    setRefresh(prev => !prev);

  };

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