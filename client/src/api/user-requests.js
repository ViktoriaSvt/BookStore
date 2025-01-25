import * as request from "./requester";

const BASE_URL = "http://localhost:3000/user";

export const getUserById = async (userId) => {
  return await request.get(`${BASE_URL}/${userId}`);
};

export const updateProfile = async (values) => {
  return await request.post(`${BASE_URL}/updateProfile`, { values });
};

export const getUserCart = async () => {
  return await request.get(`${BASE_URL}/cart`);
};


