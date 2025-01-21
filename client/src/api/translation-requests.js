import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/translations';

export const getLoginTranslations = async (language) => {
  return await request.get(`${BASE_URL}/login?lang=${language}`);
};

export const getFaqTranslations = async (language) => {
  return await request.get(`${BASE_URL}/faq?lang=${language}`);
};

export const getRegisterTranslations = async (language) => {
  return await request.get(`${BASE_URL}/register?lang=${language}`);
}
