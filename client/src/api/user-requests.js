import * as request from "./requester";

const BASE_URL = "http://localhost:3000/user";
const BASE_URL_SPRING = "http://localhost:8080/users";

export const getUserById = async (userId) => {
  return await request.get(`${BASE_URL_SPRING}/${userId}`);
};

export const updateProfile = async (values) => {
  return await request.post(`${BASE_URL}/updateProfile`, { values });
};

export const getUserCart = async () => {
  return await request.get(`${BASE_URL}/cart`);
};


