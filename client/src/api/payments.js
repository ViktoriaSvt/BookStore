import * as request from "./requester";
const BASE_URL_SPRING_STRIPE = 'http://localhost:8083/api/payments';

export const createPurchase = async (paymentMethod, totalAmount, books) => {
    const response = await request.post(`${BASE_URL_SPRING_STRIPE}`, {
        paymentMethodId: paymentMethod.id,
        amount: totalAmount,
        books:books
    });

    return response
};

export const getHistory= async (userId) => {
    return await request.get(`${BASE_URL_SPRING_STRIPE}/${userId}/history`)
  }
  
