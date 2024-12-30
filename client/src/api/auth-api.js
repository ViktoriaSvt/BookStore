import * as request from "./requester";

const BASE_URL = "http://localhost:3000/user";

export const register = async (email, password) => {
  const authData = await request.post(`${BASE_URL}/register`, { email, password });
  return authData;
}

export const login = async (email, password) => {
  const authData = await request.post(`${BASE_URL}/login`, { email, password });
  return authData;
};

export const logout = async () => {
  await request.post(`${BASE_URL}/logout`);
};

export async function getSession() {
  const session = await request.get(`${BASE_URL}/session`);
  return session
}




