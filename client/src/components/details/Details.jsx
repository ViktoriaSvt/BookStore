
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../api/cart-requests";
import { useGetBookById } from "../../hooks/useBooks"

export default function Details() {

  const [book] = useGetBookById();
  console.log(book);
  

  const submitToCartHandler = async (bookId) => {

    try {
      await addToCart(bookId);

      toast.success("Added to cart", {
        position: "top-right",
      });
    } catch {
      toast.error("Please Login first.", {
        position: "top-right",
      });
    }
  }

  const currentURL = window.location.href;

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        toast.info('Link copied to clipboard', {
          position: "top-center",
          autoClose: 1000, 
          hideProgressBar: false,
          newestOnTop: true,
          progress: undefined,
          theme: "light",
          transition: "Flip",  
          closeButton: false,
        });
      })
      .catch((err) => {
        toast.error("Failed to copy link!", {
          position: "top-right",
        });
        console.error("Error copying to clipboard: ", err);
      });
  };

  return (
    <section
      className="text-gray-700 body-font overflow-hidden bg-white relative min-h-1600 pb-20 m-3"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(26, 154, 228, 0.6), rgba(0, 0, 0, 0.98)), url(${book.bannerImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <ToastContainer 
    
      />

      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0 "></div>

      <div className="container px-5 py-24 mx-auto relative z-10">
        <div className="lg:w-4/5 mx-auto flex flex-wrap items-end">
          <div className="lg:w-1/2 max-w-[400px] p-10">
            <img
              alt="ecommerce"
              className="object-cover object-center rounded-lg border border-gray-200 w-full h-auto"
              src={book.coverImageUrl}
            />
          </div>

          <div className="p-10 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="mt-10 text-sm title-font text-gray-300 tracking-widest">
              Published by <span className="text-gray-400">{book.author}</span>
            </h2>
            <h1 className="text-white mt-9 text-3xl title-font font-medium mb-4">
              {book.title}
            </h1>

            <p className="leading-relaxed mb-6 text-white">{book.description}</p>

            <div className="flex ">
              <span className="text-white font-medium text-xl mr-4">{book.genre}</span>
              <span className="text-white font-medium text-xl">{book.year}</span>
            </div>

            {book.quantity > 1 && (
              <div className="flex mb-5">
                <span className="text-green-500 text-sm font-medium">In Stock</span>
              </div>
            )}

            <div className="flex">
              <span className="title-font font-medium text-2xl text-white">
                ${book.price}
              </span>
              <button
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-lg"
                onClick={() => submitToCartHandler(book.id)}
              >
                Add to Cart
              </button>

              <button
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                onClick={handleCopyClick}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>


            <div className="mt-8 bg-gray-200 bg-opacity-80 p-4 rounded-lg flex items-center space-x-3">
              <i className="fa-solid fa-truck-fast text-gray-700 text-2xl"></i>
              <span className="text-gray-700 font-medium text-lg">
                Estimated delivery: <span className="font-bold text-lg">3-5 days</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

  );


}