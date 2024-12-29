import * as request from "./requester";

const BASE_URL = "http://localhost:3000/account";

export const login = async (email, password) => {

  try {
    const authData = await request.post(`${BASE_URL}/login`, { email, password });
    
    return authData; 
    
  } catch (error) {
    throw new Error(error.message);
  }

};

export const register = async ( email, password ) => {
  const authData = await request.post(`${BASE_URL}/register`,{ email, password } );


  
  return authData; 
}

export async function getSession() {


  
  const session = await request.get(`${BASE_URL}/session`);

 

  return session
}
