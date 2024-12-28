import * as request from "./requester";

const BASE_URL = "http://localhost:3000/account";

export const login = async (username, password) => {

  try {
    const authData = await request.post(`${BASE_URL}/login`, { username, password });

    if (!authData || !authData.accessToken) {
      throw new Error("Login failed: Invalid credentials or missing token");
    }

    return authData; 
    
  } catch (error) {
    console.error("Login API error:", error.message);
  }

};



export const register = async ( email, password ) => {
  const authData = await request.post(`${BASE_URL}/register`,{ email, password } );
  return authData; 
}
