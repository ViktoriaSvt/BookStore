export default function OrderHistory({ order }) {
  const formattedDate = new Date(order.createdAt).toISOString().split('T')[0]; // format the date

  return (
    <div className="w-[180px] h-[250px] bg-[#4C6EF5] rounded-lg shadow-lg flex flex-col ">
      <div className="w-[60%] h-[3%] bg-[#6A8DFF] mx-auto rounded-b-lg mb-4"></div>
      
      {/* Book Titles Section */}
      <div className="px-[10px] mt-[10px] flex-grow">
        <h3 className="font-semibold text-white text-center text-[14px] mb-2">Books</h3>
        <div className="space-y-[4px]">
          {order.bookTitles.map((title, index) => (
            <p key={index} className="font-normal text-white text-center text-[12px] m-1 bg-[#6A8DFF] ">
              {title}
            </p>
          ))}
        </div>
      </div>

      {/* Order Info Section */}
      <div className="px-[10px] mt-2 border-t-2 border-[#6A8DFF] pt-2 p-4">
        <span className="font-semibold text-white text-center block text-[14px]">{formattedDate}</span>
        <p className="font-normal text-white text-center text-[12px]">{order.id}</p>
      </div>

      {/* Button Section */}
      <span className="px-[20px] py-[6px] block mx-auto rounded-[6px] border-none mt-auto bg-[#6A8DFF] text-white font-semibold hover:bg-[#4C6EF5] transition duration-200 m-3">
       Tracking info
      </span>
    </div>
  );
}
