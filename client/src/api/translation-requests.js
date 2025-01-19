import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/translations';

export const getLoginTranslations = async (language) => {
  const responce = await request.get(`${BASE_URL}/login?lang=${language}`);
  return responce;
}


export const getFaqTranslations = async (language) => {


  
  const responce = await request.get(`${BASE_URL}/faq?lang=${language}`);


  
  return responce;
}