
import { useNavigate } from "react-router-dom";
import { addToCart} from "../../api/cart-requests";
import { useGetAllBooks } from "../../hooks/useBooks";
import BookItem from "./book-item/BookItem";
import { useState } from "react";

export default function Search() {
  const [books] = useGetAllBooks();
  const [notification, setNotification] = useState('');

  const submitButtonHandler = async (bookId) => {
    await addToCart(bookId);
    
    setNotification('Item added to cart');

    console.log(notification);
    
    
    setTimeout(() => {
      setNotification('');
    }, 3000);
  }



  return (
    <>
      <div className="search">
        <form><input type="text" name="search-bar" id="search-bar" placeholder="Search for books..." /></form>
      </div>

      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {books.map(currentBook => (
          <BookItem
            key={currentBook._id}
            book={currentBook}
            submitHandler={() => submitButtonHandler(currentBook._id)}
          />
        ))}
      </div>
    </>
  )
}