import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { getUserDetails, updateUser } from '../actions/userAction';
import Card from '../components/UI/Card';

import { USER_UPDATE_RESET } from '../constants/userConstants';

import classes from './RegisterScreen.module.css';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, phoneNumber, isAdmin }));
  };

  return (
    <div className={classes['form-container']}>
      <Card className='l'>
        <h3 className={classes['form-title']}>ویرایش کاربر</h3>
        {loadingUpdate && <Loader />}
        {errorUpdate && <h5>{errorUpdate}</h5>}
        {error && <h5>{error}</h5>}
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
          <div className={classes['input-container_checkbox']}>
            <input
              id='is admin'
              type='checkbox'
              placeholder='زرین پال'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <label htmlFor='payment' className={classes['payment-name']}>
              ادمین
            </label>
          </div>

          <button type='submit' className={classes['btn-submit']}>
            ویرایش
          </button>
        </form>
      </Card>
    </div>
  );
};

export default UserEditScreen;
