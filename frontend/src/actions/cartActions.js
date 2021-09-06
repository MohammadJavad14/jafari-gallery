/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart =
    (id, qty = 1, color = null) =>
    async(dispatch, getState) => {
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
                color,
            },
        });

        localStorage.setItem(
            'cartItems',
            JSON.stringify(getState().cart.cartItems)
        );
    };

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};