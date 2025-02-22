import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/catalog';
const BASE_URL_SPRING = 'http://localhost:8080/books';

export const getAll = async () => {
  return await request.get(BASE_URL_SPRING);
};

export const getById = async (bookId) => {
  return await request.get(`${BASE_URL_SPRING}/${bookId}`);
};

export const createBook = async (data) => {

  localStorage.removeItem('bookETag');
  return await request.post(`${BASE_URL_SPRING}/create`, data);
};

export const getBooksBySearch = async (searchQuery) => {
  return await request.get(`${BASE_URL_SPRING}/search?query=${searchQuery.params}`);
};

export const deleteBook = async (bookId) => {
  return await request.del(`${BASE_URL}/${bookId}`);
};
