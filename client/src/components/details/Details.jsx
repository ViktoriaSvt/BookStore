
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../api/cart-requests";
import { useGetBookById } from "../../hooks/useBooks"

export default function Details() {

  const [book] = useGetBookById();

  const submitToCartHandler = async ( bookId) => { 
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

  return (

    <section
      className="text-gray-700 body-font overflow-hidden bg-white  relative min-h-1600 pb-20"
      style={{
        backgroundImage: `url(${book.bannerImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <ToastContainer />

      <div className=" absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0 "></div>

      <div className="container px-5 py-24 mx-auto relative z-10 ">

      <div className="lg:w-4/5 mx-auto flex flex-wrap items-end">

          <div className="lg:w-1/2 max-w-[400px] max-h-[500px] p-10">
            <img
              alt="ecommerce"
              className="object-cover object-center rounded border border-gray-200 min-w-[300px]"
              src={book.coverImageUrl}
            />
          </div>

          <div className=" p-10 lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

            <h2 className=" mt-10 text-sm title-font text-gray-300 tracking-widest">
              published by {book.author}
            </h2>
            <h1 className="text-white mt-9 text-3xl title-font font-medium mb-1">
              {book.title}
            </h1>

            <p className="leading-relaxed mb-6 text-white">{book.description}</p>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-white">
                ${book.price}
              </span>
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() => submitToCartHandler( book.id)}>
                Add to Cart
              </button>

              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4" >
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );


}