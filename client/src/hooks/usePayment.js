import { useEffect, useState } from "react";
import { getHistory } from "../api/payments";

export function useGetOrders(userId) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getHistory(userId);

            if (data != null) {
                setOrders(data);
            }

        })()
    }, [userId])
    
    return orders
}