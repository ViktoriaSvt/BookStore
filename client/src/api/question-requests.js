import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/faq';


export const postQuestion = async (text) => await request.post(`${BASE_URL}/postQuestion`, { text })

export const getQuestions = async () => await request.get(`${BASE_URL}/all`)

export const answerQuestion = async (questionId, text) => await request.post(`${BASE_URL}/${questionId}`, { text })
