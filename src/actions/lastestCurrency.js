/**
 * this is action function that used in currencyConversion segment
 */

import { api } from '../api/index';
import * as types from '../constants/action-types';

// action for get lastest Currency from API with method get
const getLastestCurrency = (date, timeseries) => {
  return async (dispatch) => {
    try {
      let apiEndpoint = 'latest?base=USD';
      const response = await api.get(apiEndpoint);
      dispatch(lastestCurrency(types.GET_LASTEST_CURRENCY, response.data));
      return response.status;
    } catch (error) {
      return error;
    }   
  }
}

//action for add currency to the selected list
const addCurrency = (currency) => {
  return (dispatch) => {
    try {
      dispatch(lastestCurrency(types.ADD_CURRENCY, currency));
      return true
    } catch (error) {
      return error;
    }   
  }
}

//action for remove currency from selected list
const deleteCurrency = (currency) => {
  return (dispatch) => {
    try {
      dispatch(lastestCurrency(types.DELETE_CURRENCY, currency));
      return true
    } catch (error) {
      return error;
    }   
  }
}

export const lastestCurrency = (type, data) => {
  return {
    type: type,
    data: data,
  }
}

export const lastestCurrencyActions = {
    getLastestCurrency,
    addCurrency,
    deleteCurrency,
}
