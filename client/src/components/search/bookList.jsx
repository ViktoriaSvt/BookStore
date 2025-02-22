
import { addToCart } from "../../api/cart-requests";
import { useGetAllBooks } from "../../hooks/useBooks";
import "react-toastify/dist/ReactToastify.css";
import BookItem from "./book-item/BookItem";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { getBooksBySearch } from "../../api/book-requests";


export default function Search() {
  const [books, setBooks] = useGetAllBooks();
  

  const submitToCartHandler = async (bookId) => {

    const response = await addToCart(bookId);
    
    if(response){
      toast.success("Added to cart", {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
  }

  const searchCallback = async (searchQuery) => {
    if (searchQuery.params != null) {
      const response = await getBooksBySearch(searchQuery)
      setBooks(response)
    }
  }

  const { values, changeHandler, submitHandler } = useForm({ params: '' }, searchCallback)


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
        {books.map(currentBook => (
          <BookItem
            key={currentBook.id}
            book={currentBook}
            submitHandler={() => submitToCartHandler(currentBook.id)}
          />
        ))}
      </div>
    </>
  )
}