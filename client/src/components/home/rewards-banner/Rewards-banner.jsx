import { useNavigate } from "react-router-dom";
import { useGetNewestBooks } from "../../../hooks/useBooks";


export default function RewardsBanner() {

  const navigate = useNavigate();
  const [books] = useGetNewestBooks(2020);

  const handleDetailsClick = (bookId) => {
    navigate(`/details/${bookId}`);
  };



  return (
    <section className="banner relative">
      
      <div className="header text-left pl-8 py-4 mb-6 relative z-10">
        <h2 className="text-3xl font-extrabold tracking-wider text-metallic-gradient">
          New Books of {new Date().getFullYear()}
        </h2>
        <p className="mt-2 text-lg font-medium text-metallic-gradient">
          Discover the hottest releases of the year.
        </p>
      </div>

      <div className="background-banner">
        <div className="scrolling-container">
          <div className="container-recc">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} className="reccomended">
                  <div>
                    <img src={book.coverImageUrl} alt={book.title} />
                  </div>
                  <div className="book-details">
                    <button className="details" onClick={() => handleDetailsClick(book.id)}>Details</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No books available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
