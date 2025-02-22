
import axiosInstance from '../axiosConfig/axiosInstance';


async function requester(method, url, data) {
    let eTag = localStorage.getItem('bookETag');

    try {
        const response = await axiosInstance({
            method,
            url,
            data,
            headers: {
                'If-None-Match': eTag || '', 
              },
        });

        console.log( 'MY RESPONSE', response);
        console.log(response.headers['etag']);
        
        

        if (response.headers['etag']) {
            localStorage.setItem('bookETag', response.headers['etag']);
          }

        return response.data;
    } catch {
        
        return "denied";
    }

}

export const get = (url, data) => requester('GET', url, data);
export const post = (url, data) => requester('POST', url, data);
export const put = (url, data) => requester('PUT', url, data);
export const del = (url, data) => requester('DELETE', url, data);