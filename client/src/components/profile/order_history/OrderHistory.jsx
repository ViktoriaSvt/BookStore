export default function OrderHistory({ order }) {
  const formattedDate = new Date(order.createdAt).toISOString().split('T')[0];
  const isDenied = order.paymentStatus === 'DENIED';
  const statusColor = isDenied ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="group relative w-[160px] h-[130px] bg-gray-100 rounded-lg shadow-md flex flex-col overflow-hidden">
      <div className="w-[60%] h-[2px] bg-gray-300 mx-auto rounded-b-lg mb-4"></div>

      <div className={`mt-[10px] flex-shrink flex items-center justify-center ${statusColor} rounded-md mx-3`}>
        <h3 className="font-bold text-white text-center text-[14px]">
          {order.paymentStatus}
        </h3>
      </div>

      <div className="px-[10px] mt-2 pt-2 p-2 flex flex-col items-center">
        <span className="font-semibold text-gray-700 text-center block text-[13px]">{formattedDate}</span>
        <p className="text-gray-500 text-[11px] font-semibold">Order ID</p>
        <p className="font-normal text-gray-600 text-center text-[11px] break-words">{order.id}</p>
      </div>


      <div className="absolute inset-0 bg-white bg-opacity-90 p-2 hidden group-hover:flex flex-col items-center justify-center z-10">
        <h4 className="text-gray-800 font-semibold text-[13px] mb-2">Books Ordered</h4>
        <div className="overflow-y-auto max-h-[80px] space-y-1">
          {order.bookTitles && order.bookTitles.length > 0 ? (
            order.bookTitles.map((title, index) => (
              <p key={index} className="text-gray-600 text-[11px] text-center">{title}</p>
            ))
          ) : (
            <p className="text-gray-500 text-[11px] italic">No books</p>
          )}

        </div>
      </div>
    </div>
  );
}
