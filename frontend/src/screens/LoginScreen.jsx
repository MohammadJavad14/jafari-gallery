import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { login } from '../actions/userAction';
import Card from '../components/UI/Card';

import classes from './LoginScreen.module.css';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className={classes['form-container']}>
      <Card className='l'>
        <h3 className={classes['form-title']}>ورود</h3>
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler} className={classes.form}>
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
          <button type='submit' className={classes['btn-submit']}>
            ورود
          </button>
        </form>
        <div className={classes.register}>
          <h5 className={classes['register-text']}>هنوز ثبت نام نکرده اید؟</h5>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <h5 className={classes['register-link']}>ثبت نام</h5>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
