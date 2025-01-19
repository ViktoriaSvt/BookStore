import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/catalog';

export const getAll = async () => await request.get(BASE_URL);

export const getById = async (bookId) => await request.get(`${BASE_URL}/${bookId}`)

export const addToCart = async (bookId) => {
    const responce = await request.post(`${BASE_URL}/${bookId}`)

    

    if (responce.status == 403) {
        console.log("unauthorized action for administrator role!");
    }
}

export const createBook = async (data) => await request.post(`${BASE_URL}/create`, data);

export const getBooksBySearch = async (searchQuery) => {

    const result = await request.post(`${BASE_URL}/search?query=${searchQuery.params}`)
    return result
}

export const deleteGame = async (bookId) => await request.del(`${BASE_URL}/${bookId}`)






