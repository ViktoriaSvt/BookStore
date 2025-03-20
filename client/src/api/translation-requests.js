import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/translations';
const BASE_URL_SPRING = 'http://localhost:8087/api';

export const getLoginTranslations = async (language) => {
  return await request.get(`${BASE_URL_SPRING}/auth/translate/login?lang=${language}`);
};

export const getFaqTranslations = async (language) => {
  return await request.get(`http://localhost:8082/api/questions/translate/faq?lang=${language}`);
};

export const getRegisterTranslations = async (language) => {
  return await request.get(`${BASE_URL_SPRING}/auth/translate/register?lang=${language}`);
}
