import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/cart';
const BASE_URL_SPRING = 'http://localhost:8086/api/cart';
const BASE_URL_PROXY = 'http://localhost:8081/api/cart';


export const addToCart = async (id, data) => {
    return await request.put(`${BASE_URL_PROXY}/add/${id}`, data);
};

export const getCartItems = async () => {
    return await request.get(`${BASE_URL_PROXY}/items`);
};

export const removeItem = async (id) => {
    return await request.del(`${BASE_URL_PROXY}/remove/${id}`);
};


