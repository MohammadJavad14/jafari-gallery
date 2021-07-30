import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import Card from '../components/UI/Card';
import Row from '../components/UI/Row';
import classes from './CartScreen.module.css';
import Message from '../components/UI/Message';
import Seprator from '../components/UI/Seprator';
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  let disable = false;

  const increaseQty = (e) => {
    e.preventDefault();
    if (qty === 1) {
      return;
    }
    // setQty((prevState) => --prevState);
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    if (qty === 1) {
      return;
    }
    // setQty((prevState) => --prevState);
  };

  const qtyHandler = (e) => {
    // console.log(e);
    // setQty(e?.target?.value);
  };

  return (
    <>
      <Card className='l'>
        <h3>سبد خرید</h3>
      </Card>
      <br />

      {cartItems.length === 0 ? (
        <Message>
          سبد خرد شما خالی می باشد{' '}
          <Link to='/' className={classes.link}>
            بازگشت
          </Link>
        </Message>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card className='ss' key={item.product}>
              <div className={classes['img-container']}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={classes['product-details']}>
                <h5 className={classes['product-name']}>{item.name}</h5>
                <Row>
                  <h1 className={classes.price}>{` ${item.price?.toLocaleString(
                    'fa-IR'
                  )}  تومان `}</h1>
                  <h5 className={classes['product-stock']}>
                    {item.countInStock < 1
                      ? 'ناموجود'
                      : item.countInStock < 6
                      ? `فقط ${item.countInStock} عدد باقی مانده `
                      : 'موجود در انبار'}
                  </h5>
                </Row>
                <form className={classes['add-cart-form']}>
                  <div className={classes.inputs}>
                    <select
                      id={item.product}
                      type='select'
                      className={`${classes['product-number-input']} ${
                        disable && classes.disabled
                      }`}
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {(x + 1).toLocaleString('fa-IR')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    id={item.product}
                    className={classes['btn-trash']}
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </form>
              </div>
            </Card>
          ))}
        </>
      )}
      <div className={classes['cart-summery-container']}>
        <div className={classes['cart-summery']}>
          <h5>تعداد محصولات :</h5>
          <h5 className={classes['number-product']}>
            {cartItems
              .reduce((acc, item) => acc + item.qty, 0)
              .toLocaleString('fa-IR')}
          </h5>
        </div>
        <div className={classes['cart-summery']}>
          <h5>قیمت محصولات :</h5>
          <h3 className={classes['summery-price']}>
            {`${cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toLocaleString('fa-IR')} تومان`}
          </h3>
        </div>
        <Seprator />
        <button
          onClick={checkoutHandler}
          className={`${classes['btn-proceed']} ${
            cartItems.length === 0 && classes.disabled
          }`}
          disabled={cartItems.length === 0 && true}
        >
          ادامه فرآیند خرید
        </button>
      </div>
    </>
  );
};

export default CartScreen;
