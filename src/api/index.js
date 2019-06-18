/**
 * this is where you create api methods template
 */

import axios from 'axios';
import config from './config';

export const api = {
  get,
};

//api with get method
async function get(apiEndpoint){
  try {
    const response = await axios.get(config.baseUrl+apiEndpoint, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response);
  }  
}