import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/catalog';

export const getAll = async () => await request.get(BASE_URL);

export const getById = async(bookId) => await request.get(`${BASE_URL}/${bookId}`)

export const createGame = async (data) => await request.post(BASE_URL , data);

export const deleteGame = async (bookId) => await request.del(`${BASE_URL}/${bookId}`)






