import { Link } from "react-router-dom";

export default function BookItem({ book, submitHandler, toggleSelect, isSelected, isAdmin }) {
  const handleSelect = (e) => {
    if (isAdmin) {
      e.preventDefault(); 
      e.stopPropagation(); 
      toggleSelect();
    }
  };

  return (
    <div
      className={`relative bg-white shadow-lg rounded-xl w-[200px] m-2 group hover:scale-105 transition-all duration-300 ease-in-out ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
    >

      {isAdmin && (
        <div
          className="absolute inset-0 cursor-pointer bg-transparent z-20" 
          onClick={handleSelect}
        />
      )}


      <Link to={`/details/${book.id}`} className="relative z-10 block">
        <div className="relative">
          <img
            className="rounded-[0px] p-6 object-contain w-[200px] max-h-[280px] transition-all duration-300 transform group-hover:scale-110"
            src={book.coverImageUrl}
            alt="product image"
            data-testid="book-cover-image"
          />

       
          <div className="w-[150px] absolute inset-0 bg-black opacity-0 group-hover:opacity-75 transition-all duration-300 rounded-[0px] flex items-center justify-center text-white m-7">
            <div className="text-center px-4 p-10">
              <p className="text-lg font-semibold">{book.author}</p>
              <p className="text-sm">{book.year}</p>
              <p className="text-sm pb-[10px]">Genre: {book.genre}</p>
              <p className="text-sm">
                {book.description.length > 200 ? book.description.substring(0, 200) + "..." : book.description}
              </p>
            </div>
          </div>
        </div>
      </Link>


      <div className="px-5 pb-5 relative z-10">
        <Link to={`/details/${book.id}`}>
          <h3 className="text-gray-900 font-semibold text-lg tracking-tight mb-2 group-hover:text-[#4C6EF5] transition-all duration-300">
            {book.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${book.price}</span>
          <button
            onClick={submitHandler}
            className="text-white bg-[#4C6EF5] hover:bg-[#3A5CE0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
