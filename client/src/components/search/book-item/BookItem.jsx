import { Link } from "react-router-dom";

export default function BookItem({
    book,
    detailsHandler,
}) {

    return (
        <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 m-2 ">
            <Link to={`/details/${book._id}`}>
                <img
                    className="rounded-[30px] p-8  object-contain min-w-[200px] max-w-[300px] max-h-[300px]"
                    src={book.coverImageUrl}
                    alt="product image"
                />
            </Link>
            <div className="px-5 pb-5">
                <Link to={`/details/${book._id}`}>
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{book.title}</h3>
                </Link>
                <div className="flex items-center mt-2.5 mb-5"></div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${book.price}</span>
                    <button onClick={detailsHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>

    );
}