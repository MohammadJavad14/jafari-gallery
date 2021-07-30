import React from 'react';
import Card from '../components/UI/Card';
import Row from '../components/UI/Row';
import { Link } from 'react-router-dom';
import classes from './CheckoutSteps.module.css';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className={classes['step-container']}>
      <li className={classes['checkout-item']}>
        {step1 ? <Link to='/login'>ورود</Link> : <Link to=''>ورود</Link>}
      </li>
      <li className={classes['checkout-item']}>
        {step2 ? (
          <Link to='/shipping'>مشخصات پستی</Link>
        ) : (
          <Link>مشخصات پستی</Link>
        )}
      </li>
      <li className={classes['checkout-item']}>
        {step3 ? <Link to='/payment'>پرداخت</Link> : <Link>پرداخت</Link>}
      </li>
      <li className={classes['checkout-item']}>
        {step4 ? (
          <Link to='/placeorder'>ایجاد سفارش</Link>
        ) : (
          <Link>ایجاد سفارش</Link>
        )}
      </li>
    </div>
  );
};

export default CheckoutSteps;
