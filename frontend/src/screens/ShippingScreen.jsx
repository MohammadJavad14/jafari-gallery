import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import classes from './RegisterScreen.module.css';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartAction';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ country, city, address, postalCode }));
    history.push('/payment');
  };
  return (
    <div className={classes.shipping}>
      <Card className='l'>
        <CheckoutSteps step1 step2 />
      </Card>
      <Card className='l'>
        <h5>مشخصات پستی</h5>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes['input-container']}>
            <i className={`${classes['login-icons']}  fas fa-globe-asia`}></i>
            <input
              type='text'
              placeholder='استان'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className={classes['input']}
            />
          </div>
          <div className={classes['input-container']}>
            <i className={`${classes['login-icons']}  fas fa-building`}></i>
            <input
              type='text'
              placeholder='شهر'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className={classes['input']}
            />
          </div>
          <div className={classes['input-container']}>
            <i
              className={`${classes['login-icons']}  fas fa-map-marked-alt`}
            ></i>
            <input
              type='text'
              placeholder='آدرس پستی'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className={classes['input']}
            />
          </div>
          <div className={classes['input-container']}>
            <i className={`${classes['login-icons']}  fas fa-barcode`}></i>
            <input
              type='number'
              placeholder='کد پستی'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              className={classes['input']}
            />
          </div>
          <button type='submit' className={classes['btn-submit']}>
            مرحله بعد
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ShippingScreen;
