import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/faq';
const BASE_URL_SPRING = 'http://localhost:8080/faq';

export const postQuestion = async (text) => {
  return await request.post(`${BASE_URL_SPRING}/postQuestion`, { text });
};

export const getQuestions = async () => {
 const reponse = await request.get(`${BASE_URL_SPRING}/all`);
 return reponse
};

export const answerQuestion = async (text, id) => {
  return await request.put(`${BASE_URL_SPRING}/${id}`, { text });
};

export const getUserQuestions = async (userId) => {
  return await request.get(`${BASE_URL_SPRING}/${userId}/questions`)
}
