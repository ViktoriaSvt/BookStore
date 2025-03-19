import * as request from "./requester";

const BASE_URL = "http://localhost:3000/user";
const BASE_URL_SPRING = "http://localhost:8087/api/auth";

export const register = async (email, password, rePass) => {
  const authData = await request.post(`${BASE_URL_SPRING}/register`, { email, password, rePass });
  
  localStorage.setItem("jwtToken", authData.jwtToken);
  return authData;
}

export const login = async (email, password) => {
  const authData = await request.post(`${BASE_URL_SPRING}/login`, { email, password });

  localStorage.setItem("jwtToken", authData.jwtToken);
  return authData;
};

export const logout = async () => {
  localStorage.removeItem("jwtToken")
  // window.location.href = "http://localhost:5173/login";
};

export async function getSession() {
  const session = await request.get(`${BASE_URL_SPRING}/session`);
  return session;
}




