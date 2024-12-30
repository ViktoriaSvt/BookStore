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