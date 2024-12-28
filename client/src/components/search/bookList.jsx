
import { useGetAllBooks } from "../../hooks/useBooks";
import BookItem from "./book-item/BookItem";

export default function Search() {


  const [books] = useGetAllBooks();


  return (
    <>

      <div className="search">
        <form > <input type="text" name="search-bar" id="search-bar" placeholder="Search for books..." /></form>
      </div>

      <div className="flex flex-wrap justify-center">
        {books.map(currentBook => (

          <BookItem
            key={currentBook._id}
            book={currentBook}
          />

        ))}
      </div>



    </>
  )
}