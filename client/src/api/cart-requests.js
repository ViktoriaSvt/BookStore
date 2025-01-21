import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/cart';

export const addToCart = async (bookId) => {
    return await request.post(`${BASE_URL}/${bookId}`);
};

export const getCartItems = async () => {
    return await request.get(`${BASE_URL}/items`);
};

export const removeItem = async (bookId) => {
    return await request.del(`${BASE_URL}/remove/${bookId}`);
};

export const createPurchase = async (paymentMethod, totalAmount) => {

    const response = await request.post(`${BASE_URL}/payment`, {
        paymentMethodId: paymentMethod.id,
        amount: totalAmount,
    });

    return response
};


