/* eslint-disable no-undef */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  getMyOrdersReducer,
  getOrderByIdReducer,
  goToPaymentReducer,
  orderCreateReducer,
  payResultReducer,
} from './reducers/orderReducers';
import { footerTabReducer } from './reducers/footerReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  goToPayment: goToPaymentReducer,
  paymentResult: payResultReducer,
  orderDetail: getOrderByIdReducer,
  orderMyDetail: getMyOrdersReducer,
  tabs: footerTabReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const activeTabFromStorage = localStorage.getItem('activeTab')
  ? JSON.parse(localStorage.getItem('activeTab'))
  : 0;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  tabs: { activeTab: activeTabFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
