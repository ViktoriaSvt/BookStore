
import * as request from "./requester";


const BASE_URL = 'http://localhost:3000/stateTracker';

export const getTrackingData = async() => {
    const reponce = await request.get(`${BASE_URL}/state`);
    return reponce
}