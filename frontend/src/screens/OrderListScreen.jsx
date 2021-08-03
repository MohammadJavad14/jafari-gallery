import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { listOrders } from '../actions/orderActions';
import Card from '../components/UI/Card';
import Header from '../components/Header';

import classes from './UserListScreen.module.css';
const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Header />
      <h3 className={classes.title}>سفارشات</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          {orders.map((order) => (
            <Card className='l' key={order._id}>
              <div className={classes['order-summery']}>
                <h5>شناسه :</h5>
                <h4>{order._id.toLocaleString('fa-IR')}</h4>
              </div>
              <div className={classes['order-summery']}>
                <h5> نام کاربر :</h5>
                <h4>{order.user && order.user.name}</h4>
              </div>
              <div className={classes['order-summery']}>
                <h5> تاریخ :</h5>
                <h5>
                  {new Date(order.createdAt).toLocaleTimeString('fa-IR')}
                  {' , '}
                  {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                </h5>
              </div>
              <div className={classes['order-summery']}>
                <h5>قیمت کل :</h5>
                <h5>{`${order.totalPrice.toLocaleString('fa-IR')} تومان`}</h5>
              </div>
              <div className={classes['order-summery']}>
                <h5>پرداخت شده :</h5>

                {order.isPaid ? (
                  <h5>
                    {new Date(order.paidAt).toLocaleTimeString('fa-IR')}
                    {' , '}
                    {new Date(order.paidAt).toLocaleDateString('fa-IR')}
                  </h5>
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </div>

              <div className={classes['order-summery']}>
                <h5>تحویل داده شده :</h5>

                {order.isDelivered ? (
                  <h5>
                    {new Date(order.deliveredAt).toLocaleTimeString('fa-IR')}
                    {' , '}
                    {new Date(order.deliveredAt).toLocaleDateString('fa-IR')}
                  </h5>
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </div>

              <Link to={`/order/${order._id}`}>
                <button className={classes['btn-details']}>جزئیات</button>
              </Link>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default OrderListScreen;
