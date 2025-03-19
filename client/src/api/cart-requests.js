import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/cart';
const BASE_URL_SPRING = 'http://localhost:8081/api/cart';


export const addToCart = async (id) => {
    const res = await request.put(`${BASE_URL_SPRING}/add/${id}`);
    return res;
};

export const getCartItems = async () => {
    const response = await request.get(`${BASE_URL_SPRING}/items`);
    return response;
};

export const removeItem = async (id) => {
    return await request.del(`${BASE_URL_SPRING}/remove/${id}`);
};


