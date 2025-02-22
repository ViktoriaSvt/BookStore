import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/cart';
const BASE_URL_SPRING = 'http://localhost:8080/cart';
const BASE_URL_SPRING_STRIPE = 'http://localhost:8080/payment';

export const addToCart = async (id) => {
    console.log(id);
    return await request.put(`${BASE_URL_SPRING}/add/${id}`);
};

export const getCartItems = async () => {
    return await request.get(`${BASE_URL_SPRING}/items`);
};

export const removeItem = async (id) => {
    return await request.del(`${BASE_URL_SPRING}/remove/${id}`);
};

export const createPurchase = async (paymentMethod, totalAmount, books) => {
    const response = await request.post(`${BASE_URL_SPRING_STRIPE}`, {
        paymentMethodId: paymentMethod.id,
        amount: totalAmount,
        books:books
    });

    return response
};


