import { useEffect, useState } from "react";
import { getCartItems } from "../api/cart-requests";


export function useGetCart(refresh) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getCartItems();

            if (data) {
                setBooks(data);
            }
        })()
    }, [refresh])

    return books
}

export function useGetTotalPrice(books) {
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const total = books.reduce((sum, book) => sum + book.price, 0);
        setTotalAmount(total);
    }, [books]);

    return totalAmount
}