export default function Item({
  book,
  removeButtonHandler
}) {

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
      {/* Image Container */}
      <td className="p-4">
        <img src={book.coverImageUrl} className="w-16 md:w-32 max-w-full max-h-full" alt={book.title} />
      </td>

      {/* Text Container */}
      <td className="px-4 py-4 text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm max-w-xs truncate">
          <div className="text-gray-900 dark:text-white">{book.title}</div>
          <span className="text-sm text-gray-500 font-mono">by {book.author}</span>
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4 text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white">
        ${book.price}
      </td>

      {/* Remove Button */}
      <td className="px-6 py-4 text-sm sm:text-base md:text-lg">
        <button onClick={removeButtonHandler} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
      </td>
    </tr>
  );
}
