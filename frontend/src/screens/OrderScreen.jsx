import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import Message from '../components/UI/Message';
import classes from './PlaceOrderScreen.module.css';
import Loader from '../components/UI/Loader';
import Row from '../components/UI/Row';
import { Link } from 'react-router-dom';
import Seprator from '../components/UI/Seprator';
import {
  getOrderDetails,
  getPayOrderResult,
  payOrder,
} from '../actions/orderActions';
import { Redirect } from 'react-router-dom';

const OrderScreen = ({ history, match, location }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPayOrderResult(orderId));
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  // const orderDetails = useSelector((state) => state.orderDetails);
  const orderPayResult = useSelector((state) => state.orderPayResult);

  const { paySuccess } = orderPayResult;

  // const { order, loading, error } = orderDetails;

  const { paymentResult, loading, error } = orderPayResult;

  const paymentHandler = () => {
    dispatch(payOrder(orderId));
  };

  // if (success) {
  //   console.log(paymentURL?.url);
  //   window.location.replace(paymentURL.url);
  // }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <h3> سفارش {paymentResult?._id}</h3>
      <div>
        <Card className='l'>
          <div className={classes['order-details']}>
            <h3>آدرس :</h3>
            <p>
              {paymentResult?.shippingAddress.country},{' '}
              {paymentResult?.shippingAddress.city},{' '}
              {paymentResult?.shippingAddress.address},{' '}
              {paymentResult?.shippingAddress.postalCode}
            </p>
          </div>
          {paymentResult?.isDelivered ? (
            <Message>تحویل داده شده در {paymentResult?.deliveredAt}</Message>
          ) : (
            <Message>تحویل داده نشده است</Message>
          )}
          <div className={classes['order-details']}>
            <h3>روش پرداخت :</h3>
            <p>{paymentResult?.paymentMethod}</p>
          </div>
          {paymentResult?.isPaid ? (
            <Message>
              پرداخت شده در{' '}
              {new Date(paymentResult?.paidAt).toLocaleTimeString('fa-IR')}
              {' , '}
              {new Date(paymentResult?.paidAt).toLocaleDateString('fa-IR')}
            </Message>
          ) : (
            <Message>پرداخت نشده است</Message>
          )}
        </Card>
        <Card className='l'>
          <div className={classes['order-items']}>
            <h3>سفارشات :</h3>
            {paymentResult?.orderItems.length === 0 ? (
              <Message> سفارش شما خالی می باشد</Message>
            ) : (
              <>
                {paymentResult?.orderItems.map((item, index) => (
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
              {paymentResult?.orderItems
                .reduce((acc, item) => acc + item.qty, 0)
                .toLocaleString('fa-IR')}
            </h5>
          </div>
          <div className={classes['cart-summery']}>
            <h5>قیمت محصولات :</h5>
            <h3 className={classes['summery-price']}>
              {`${paymentResult?.itemsPrice?.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          <div className={classes['cart-summery']}>
            <h5>هزینه ارسال :</h5>
            <h3 className={classes['summery-price']}>
              {`${paymentResult?.shippingPrice.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          <div className={classes['cart-summery']}>
            <h5>مالیات :</h5>
            <h3 className={classes['summery-price']}>
              {`${paymentResult?.taxPrice.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          <div className={classes['cart-summery']}>
            <h5>جمع کل :</h5>
            <h3 className={classes['summery-price']}>
              {`${paymentResult?.totalPrice.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          <Seprator />
          <button
            onClick={paymentHandler}
            className={`${classes['btn-proceed']} ${
              paymentResult?.orderItems.length === 0 && classes.disabled
            }`}
            disabled={paymentResult?.orderItems.length === 0 && true}
          >
            پیگیری سفارش
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
