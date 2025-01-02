
import * as request from "./requester";

const BASE_URL = "http://localhost:3000/user";
const NGROK_URL = "https://7394-185-240-189-66.ngrok-free.app/cart"

export const createPurchase = async (paymentMethod, totalAmount) => {

        console.log('generating request for stripe...');
        

        const response = await request.post(`http://localhost:3000/cart/payment`, {
                paymentMethodId: paymentMethod.id,
                amount: totalAmount,
        });

        console.log(' created request for stripe...', response);

        return response
};



export async function getUserById(userId) {
        const user = await request.get(`${BASE_URL}/${userId}`)
        return user

}


export const getUserCart = async () => (await request.get(`${BASE_URL}/cart`));





