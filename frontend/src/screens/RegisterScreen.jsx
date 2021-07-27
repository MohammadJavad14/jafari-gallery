import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { login } from '../actions/userAction';
import { register } from '../actions/userAction';
import Card from '../components/UI/Card';

import classes from './RegisterScreen.module.css';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('رمز عبور های وارد شده یکسان نیستند');
    } else {
      dispatch(register(name, phoneNumber, email, password));
    }
  };

  return (
    <div className={classes['form-container']}>
      <Card className='l'>
        <h3 className={classes['form-title']}>ثبت نام</h3>
        {message && <Message>{message}</Message>}
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
            ثبت نام
          </button>
        </form>
        <div className={classes.register}>
          <h5 className={classes['register-text']}>قبلا ثبت نام کرده اید؟</h5>
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            <h5 className={classes['register-link']}>ورود</h5>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterScreen;
