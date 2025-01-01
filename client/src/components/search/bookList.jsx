
import { addToCart} from "../../api/cart-requests";
import { useGetAllBooks } from "../../hooks/useBooks";
import "react-toastify/dist/ReactToastify.css";
import BookItem from "./book-item/BookItem";
import { toast, ToastContainer } from "react-toastify";


export default function Search() {
  const [books] = useGetAllBooks();

  const submitButtonHandler = async (bookId) => {
    
    await addToCart(bookId);

    toast.success("Added to cart", {
      position: "top-right",
    });
  }



  return (
    <>
    <ToastContainer />
      <div className="search">
        <form><input type="text" name="search-bar" id="search-bar" placeholder="Search for books..." /></form>
      </div>


      <div className="flex flex-wrap justify-center mb-40">
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