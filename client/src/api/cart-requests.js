import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/cart';


export const addToCart = async (bookId) => await request.post(`${BASE_URL}/${bookId}`)

export const getCartItems = async () => {
    const responce = await request.get(`${BASE_URL}/items`)

    return responce
}

export const removeItem = async (bookId) => {

    await request.del(`${BASE_URL}/remove/${bookId}`);

}

