import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/faq';


export const postQuestion = async (text) => await request.post(`${BASE_URL}/postQuestion`, {text})
