
import * as request from "./requester";

const BASE_URL = "http://localhost:3000/account";

export async function getUserById(userId) {
    try {

        const user = await request.get(`${BASE_URL}/${userId}`)

        
        return user

    } catch (error) {
        console.log(error.message, 'something went wrong ')
    }

}

