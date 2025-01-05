
import * as request from "./requester";

const BASE_URL = "http://localhost:3000/user";

export const createPurchase = async (paymentMethod, totalAmount) => {

        const response = await request.post(`http://localhost:3000/cart/payment`, {
                paymentMethodId: paymentMethod.id,
                amount: totalAmount,
        });

        return response
};



export async function getUserById(userId) {
        const user = await request.get(`${BASE_URL}/${userId}`)
        return user

}


export const getUserCart = async () => (await request.get(`${BASE_URL}/cart`));





