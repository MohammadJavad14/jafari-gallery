import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import classes from './PaymentScreen.module.css';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartAction';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('زرین پال');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <div className={classes.shipping}>
      <Card className='l'>
        <CheckoutSteps step1 step2 step3 />
      </Card>
      <Card className='l'>
        <h5> روش پرداخت</h5>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes['input-container']}>
            <input
              id='payment'
              type='radio'
              placeholder='زرین پال'
              value={paymentMethod}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='payment' className={classes['payment-name']}>
              زرین پال
            </label>
          </div>
          <button type='submit' className={classes['btn-submit']}>
            مرحله بعد
          </button>
        </form>
      </Card>
    </div>
  );
};

export default PaymentScreen;
