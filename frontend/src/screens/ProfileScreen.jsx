import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { login } from '../actions/userAction';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import Card from '../components/UI/Card';

import classes from './RegisterScreen.module.css';

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

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
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
  );
};

export default ProfileScreen;
