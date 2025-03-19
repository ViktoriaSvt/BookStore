import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/faq';
const BASE_URL_SPRING = 'http://localhost:8082/api/questions';

export const postQuestion = async (text) => {
  return await request.post(`${BASE_URL_SPRING}/upload`, { text });
};

export const getQuestions = async () => {
 const reponse = await request.get(`${BASE_URL_SPRING}/all`);
 return reponse
};

export const answerQuestion = async (text, id) => {
  return await request.put(`${BASE_URL_SPRING}/${id}`, { text });
};

export const getUserQuestions = async (userId) => {
  return await request.get(`${BASE_URL_SPRING}/${userId}/history`)
}
