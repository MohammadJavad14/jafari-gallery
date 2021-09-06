/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.product === item.product);

            return {
                ...state,
                cartItems: existItem ?
                    state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ) :
                    [...state.cartItems, item],
            };
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };
        default:
            return state;
    }
};