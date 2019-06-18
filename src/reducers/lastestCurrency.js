/**
 * this is reducer for produce state from action 'get lastest currency from api', 'add currency to list', and remove currency from list
 */
import * as types from '../constants/action-types';

const initialState = {
  lastestCurrency: [],
  allCurrencyList: [
    {value:'CAD', label:'Canadian Dollar'},
    {value:'IDR', label:'Indonesian Rupiah'},
    {value:'GBP', label:'British Pound'},
    {value:'CHF', label:'Swiss Franc'},
    {value:'SGD', label:'Singapore Dollar'},
    {value:'INR', label:'Indian Rupee'},
    {value:'MYR', label:'Malaysian Ringgit'},
    {value:'JPY', label:'Japanese Yen'},
    {value:'KRW', label:'South Korean won'},
  ],
  selectedCurrencyList: [
    {value:'CAD', label:'Canadian Dollar'},
    {value:'IDR', label:'Indonesian Rupiah'},
    {value:'GBP', label:'British Pound'},
    {value:'CHF', label:'Swiss Franc'},
  ]
};

export function lastestCurrency(state = initialState, action) {
  switch (action.type) {
    case types.GET_LASTEST_CURRENCY:
      return {
        ...state, lastestCurrency: action.data
      };
      case types.ADD_CURRENCY:
        return {
          ...state, selectedCurrencyList : [...state.selectedCurrencyList,action.data]
        };
      case types.DELETE_CURRENCY:
      return {
        ...state, selectedCurrencyList: state.selectedCurrencyList.filter(function(e) { return e.value !== action.data.value })
      };
    default:
      return state
  }
}
