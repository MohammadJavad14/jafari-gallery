import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { myOrdersList } from '../actions/orderActions';
import Card from '../components/UI/Card';

import classes from './ProfileScreen.module.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(myOrdersList());
      } else {
        setName(user.name);
        setPhoneNumber(user.phoneNumber);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('رمز عبور های وارد شده یکسان نیستند');
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, phoneNumber, email, password })
      );
    }
  };

  return (
    <>
      <Header />
      <div className={classes['form-container']}>
        <Card className='l'>
          <h3 className={classes['form-title']}>حساب من</h3>
          {message && <Message>{message}</Message>}
          {error && <h5>{error}</h5>}
          {success && <Message>حساب کاربری ویرایش شد</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  far fa-user`}></i>
              <input
                type='name'
                placeholder='نام و نام خانوادگی خود را وارد کنید'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes['input']}
              />
            </div>
            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-phone`}></i>
              <input
                type='number'
                placeholder='شماره موبایل خود را وارد کنید'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={classes['input']}
              />
            </div>
            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-at`}></i>
              <input
                type='email'
                placeholder='ایمیل خود را وارد کنید'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes['input']}
              />
            </div>
            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-key`}></i>
              <input
                type='password'
                placeholder='رمز عبور خود را وارد کنید'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes['input']}
              />
            </div>
            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-check`}></i>
              <input
                type='password'
                placeholder='رمز عبور خود را تکرار کنید'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={classes['input']}
              />
            </div>

            <button type='submit' className={classes['btn-submit']}>
              ویرایش
            </button>
          </form>
        </Card>
      </div>
      <div>
        <Card className='l'>
          <h3>سفارش های من</h3>
          {loadingOrders && <Loader />}
          {errorOrders && <h5>{errorOrders}</h5>}
        </Card>
        {orders?.map((order) => {
          return (
            <Card className='l' key={order._id}>
              <div className={classes['order-summery']}>
                <h5>شناسه سفارش :</h5>
                <h4>{order._id.toLocaleString('fa-IR')}</h4>
              </div>
              <div className={classes['order-summery']}>
                <h5>تاریخ :</h5>
                <h4>{new Date(order.createdAt).toLocaleDateString('fa-IR')}</h4>
              </div>
              <div className={classes['order-summery']}>
                <h5>جمع کل :</h5>
                <h3 className={classes['summery-price']}>
                  {`${order.totalPrice.toLocaleString('fa-IR')} تومان`}
                </h3>
              </div>
              <div className={classes['order-summery']}>
                <h5>زمان تحویل :</h5>
                <h5 style={{ color: '#ee4949' }}>
                  {order.deliveredAt
                    ? new Date(order.deliveredAt).toLocaleDateString('fa-IR')
                    : 'تحویل داده نشده'}
                </h5>
              </div>
              <Link to={`/order/${order._id}`}>
                <button className={classes['btn-submit']}>مشاهده جزئیات</button>
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ProfileScreen;
