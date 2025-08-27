import * as request from "./requester";

const BASE_URL_SPRING = 'http://localhost:8087/api';

export const getLoginTranslations = async (language) => {
  return await request.get(`${BASE_URL_SPRING}/auth/translations/login?lang=${language}`);
};

//TODO change path;
export const getFaqTranslations = async (language) => {
  return await request.get(`http://localhost:8082/api/questions/translations/faq?lang=${language}`);
};

export const getRegisterTranslations = async (language) => {
  return await request.get(`${BASE_URL_SPRING}/auth/translations/register?lang=${language}`);
}
