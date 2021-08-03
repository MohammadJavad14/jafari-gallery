import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';
import { useSelector } from 'react-redux';

const Footer = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const numberOfProductInBag = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );
  return (
    <footer className={classes.footer}>
      <nav>
        <ul className={classes['footer-items']}>
          <li className={classes['footer-item']}>
            <Link to='/'>
              <button>
                <i className='fas fa-home'></i>
                <p>خانه</p>
              </button>
            </Link>
          </li>
          <li className={classes['footer-item']}>
            <Link to='/categories'>
              <button>
                <i className='fas fa-grip-horizontal'></i>
                <p>دسته بندی ها</p>
              </button>
            </Link>
          </li>
          <li className={classes['footer-item']}>
            <Link to='/cart'>
              <button>
                <i className='fas fa-shopping-bag'></i>
                {numberOfProductInBag !== 0 && (
                  <div className={classes['product-number-in-bag']}>
                    {numberOfProductInBag.toLocaleString('fa-IR')}
                  </div>
                )}
                <p
                  className={`${classes['bag-text']} ${
                    numberOfProductInBag !== 0 && classes['bag-text__active']
                  }`}
                >
                  سبد خرید
                </p>
              </button>
            </Link>
          </li>
          <li className={classes['footer-item']}>
            <Link to='/profile'>
              <button>
                <i className='far fa-user'></i>
                <p>حساب من</p>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
