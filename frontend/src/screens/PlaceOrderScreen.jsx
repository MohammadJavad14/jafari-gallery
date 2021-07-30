import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import Message from '../components/UI/Message';
import classes from './PlaceOrderScreen.module.css';
import CheckoutSteps from '../components/CheckoutSteps';
import Row from '../components/UI/Row';
import { Link } from 'react-router-dom';
import Seprator from '../components/UI/Seprator';
import { createOrder, payOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate prices

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 100000 ? 0 : 20000;

  cart.taxPrice = Number(0.09 * cart.itemsPrice);

  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  const orderPay = useSelector((state) => state.orderPay);
  const { paymentURL } = orderPay;

  useEffect(() => {
    if (paymentURL?.url) {
      window.location.replace(paymentURL.url);
    }
    // eslint-disable-next-line
  }, [history, success, paymentURL]);

  useEffect(() => {
    if (success) {
      dispatch(payOrder(order._id));
    }

    // eslint-disable-next-line
  }, [success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <Card className='l'>
        <CheckoutSteps step1 step2 step3 step4 />
      </Card>
      <Card className='l'>
        <div className={classes['order-details']}>
          <h3>آدرس :</h3>
          <p>
            {cart.shippingAddress.country}, {cart.shippingAddress.city},{' '}
            {cart.shippingAddress.address}, {cart.shippingAddress.postalCode}
          </p>
        </div>
        <div className={classes['order-details']}>
          <h3>روش پرداخت :</h3>
          <p>{cart.paymentMethod}</p>
        </div>
      </Card>
      <Card className='l'>
        <div className={classes['order-items']}>
          <h3>سفارشات :</h3>
          {cart.cartItems.length === 0 ? (
            <Message>سبد خرید شما خالی می باشد</Message>
          ) : (
            <>
              {cart.cartItems.map((item, index) => (
                <div className={classes.container} key={index}>
                  <div className={classes['img-container']}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={classes['product-details']}>
                    <Link to={`/product/${item.product}`}>
                      <h5 className={classes['product-name']}>{item.name}</h5>
                    </Link>
                    <Row>
                      <div className={classes.price}>
                        <h5>{item.qty.toLocaleString('fa-IR')}</h5>
                        <h5>x</h5>
                        <h5>{item.price.toLocaleString('fa-IR')}</h5>
                        <h5>=</h5>
                        <h5>{`${(item.qty * item.price).toLocaleString(
                          'fa-IR'
                        )}  تومان `}</h5>
                      </div>
                    </Row>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </Card>
      <div className={classes['cart-summery-container']}>
        <div className={classes['cart-summery']}>
          <h5>تعداد محصولات :</h5>
          <h5 className={classes['number-product']}>
            {cart.cartItems
              .reduce((acc, item) => acc + item.qty, 0)
              .toLocaleString('fa-IR')}
          </h5>
        </div>
        <div className={classes['cart-summery']}>
          <h5>قیمت محصولات :</h5>
          <h3 className={classes['summery-price']}>
            {`${cart.itemsPrice.toLocaleString('fa-IR')} تومان`}
          </h3>
        </div>
        <div className={classes['cart-summery']}>
          <h5>هزینه ارسال :</h5>
          <h3 className={classes['summery-price']}>
            {`${cart.shippingPrice.toLocaleString('fa-IR')} تومان`}
          </h3>
        </div>
        <div className={classes['cart-summery']}>
          <h5>مالیات :</h5>
          <h3 className={classes['summery-price']}>
            {`${cart.taxPrice.toLocaleString('fa-IR')} تومان`}
          </h3>
        </div>
        <div className={classes['cart-summery']}>
          <h5>جمع کل :</h5>
          <h3 className={classes['summery-price']}>
            {`${cart.totalPrice.toLocaleString('fa-IR')} تومان`}
          </h3>
        </div>
        <Seprator />
        <div>{error && <Message>{error}</Message>}</div>
        <button
          onClick={placeOrderHandler}
          className={`${classes['btn-proceed']} ${
            cart.cartItems.length === 0 && classes.disabled
          }`}
          disabled={cart.cartItems.length === 0 && true}
        >
          ایجاد سفارش
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
