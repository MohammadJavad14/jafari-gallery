import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import Message from '../components/UI/Message';
import classes from './PlaceOrderScreen.module.css';
import Loader from '../components/UI/Loader';
import Row from '../components/UI/Row';
import { Link } from 'react-router-dom';
import { getOrderDetails, deliverOrder } from '../actions/orderActions';
import { ORDER_DELIVERE_RESET } from '../constants/orderConstants';
import Footer from '../components/Footer';
import Header from '../components/Header';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);

  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userInfo) {
      history.push('/login');
    }
    if (!order || successDeliver) {
      dispatch({ type: ORDER_DELIVERE_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order, successDeliver, userInfo, history]);

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Header />
      <h3> سفارش {order._id}</h3>
      <div>
        <Card className='l'>
          <div className={classes['order-details']}>
            <h3>آدرس :</h3>
            <p>
              {order.shippingAddress.country}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.address},{' '}
              {order.shippingAddress.postalCode}
            </p>
          </div>
          {order.isDelivered ? (
            <Message>
              تحویل شده در
              {new Date(order.deliveredAt).toLocaleTimeString('fa-IR')}
              {' , '}
              {new Date(order.deliveredAt).toLocaleDateString('fa-IR')}
            </Message>
          ) : (
            <Message>تحویل داده نشده است</Message>
          )}
          <div className={classes['order-details']}>
            <h3>روش پرداخت :</h3>
            <p>{order.paymentMethod}</p>
          </div>
          {order.isPaid ? (
            <Message>
              پرداخت شده در {new Date(order.paidAt).toLocaleTimeString('fa-IR')}
              {' , '}
              {new Date(order.paidAt).toLocaleDateString('fa-IR')}
            </Message>
          ) : (
            <Message>پرداخت نشده است</Message>
          )}
        </Card>
        <Card className='l'>
          <div className={classes['order-items']}>
            <h3>سفارشات :</h3>
            {order.orderItems.length === 0 ? (
              <Message> سفارش شما خالی می باشد</Message>
            ) : (
              <>
                {order.orderItems.map((item, index) => (
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
              {order.orderItems
                .reduce((acc, item) => acc + item.qty, 0)
                .toLocaleString('fa-IR')}
            </h5>
          </div>
          <div className={classes['cart-summery']}>
            <h5>قیمت محصولات :</h5>
            <h3 className={classes['summery-price']}>
              {`${order.itemsPrice?.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          <div className={classes['cart-summery']}>
            <h5>هزینه ارسال :</h5>
            <h3 className={classes['summery-price']}>
              {`${order.shippingPrice.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          <div className={classes['cart-summery']}>
            <h5>مالیات :</h5>
            <h3 className={classes['summery-price']}>
              {`${order.taxPrice.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          <div className={classes['cart-summery']}>
            <h5>جمع کل :</h5>
            <h3 className={classes['summery-price']}>
              {`${order.totalPrice.toLocaleString('fa-IR')} تومان`}
            </h3>
          </div>
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <button onClick={deliverHandler} className={classes['delivered']}>
              تحویل داده شد
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderScreen;
