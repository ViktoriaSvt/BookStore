import * as request from "./requester";

const BASE_URL = 'http://localhost:3000/stateTracker';

export const getTrackingData = async () => {
  return await request.get(`${BASE_URL}/state`);
};
