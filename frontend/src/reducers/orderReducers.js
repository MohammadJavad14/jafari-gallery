/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_MY_DETAIL_FAIL,
  ORDER_MY_DETAIL_REQUEST,
  ORDER_MY_DETAIL_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESULT_FAIL,
  ORDER_PAY_RESULT_REQUEST,
  ORDER_PAY_RESULT_SUCCESS,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const goToPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        payURL: action.payload,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const payResultReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_RESULT_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_RESULT_SUCCESS:
      return {
        loading: false,
        payResult: action.payload,
      };
    case ORDER_PAY_RESULT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        orderDetail: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getMyOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_MY_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_MY_DETAIL_SUCCESS:
      return {
        loading: false,
        myOrders: action.payload,
      };
    case ORDER_MY_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
