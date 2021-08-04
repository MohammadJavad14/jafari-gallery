import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import Message from '../components/UI/Message';
import classes from './PlaceOrderScreen.module.css';
import Loader from '../components/UI/Loader';
import Row from '../components/UI/Row';
import { Link } from 'react-router-dom';
import { getPayOrderResult } from '../actions/orderActions';
import Footer from '../components/Footer';

const OrderPayScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPayOrderResult(orderId));
  }, [dispatch, orderId]);

  const orderPayResult = useSelector((state) => state.orderPayResult);

  const { paymentResult, loading, error } = orderPayResult;

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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPayScreen;
