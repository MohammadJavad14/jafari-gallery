import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import Seprator from '../components/UI/Seprator';
import Row from '../components/UI/Row';
import Loader from '../components/UI/Loader';
import classes from './ProductScreen.module.css';
import { halfSpace } from '@persian-tools/persian-tools';

import { listProductsDetails } from '../actions/productActions';

const ProductScrenn = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  let disable = false;
  const increaseQty = (e) => {
    e.preventDefault();
    if (qty >= product.countInStock) {
      return;
    }
    setQty((prevState) => ++prevState);
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    if (qty === 1) {
      return;
    }
    setQty((prevState) => --prevState);
  };

  const qtyHandler = (e) => {
    // console.log(e);
    // setQty(e?.target?.value);
  };

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  if (product.countInStock < 1) {
    disable = true;
  }

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const persianPrice = product.price?.toLocaleString('fa-IR');
  const colors = product.color?.map((c) => Object.entries(c));
  const productStock = product.countInStock;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Card className='l'>
          <img src={product.image} alt={product.name} />
          <h5 className={classes['product-name']}>{product.name}</h5>
          <Seprator />
          {colors && (
            <div className={classes['colors-container']}>
              {colors?.map((color) => (
                <div key={color[0]} className={classes['color-container']}>
                  <div
                    className={classes.color}
                    style={{ backgroundColor: color[2][1] }}
                  ></div>
                  <span className={classes['color-text']}>
                    {halfSpace(color[1][1])}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Row>
            <h1 className={classes.price}>{` ${persianPrice}  تومان `}</h1>
            <h5 className={classes['product-stock']}>
              {productStock < 1
                ? 'ناموجود'
                : productStock < 6
                ? `فقط ${productStock} عدد باقی مانده `
                : 'موجود در انبار'}
            </h5>
          </Row>
          <form className={classes['add-cart-form']}>
            <div className={classes.inputs}>
              <button
                className={`${classes['product-count-inc']} ${
                  disable && classes.disabled
                }`}
                onClick={increaseQty}
              >
                +
              </button>
              <input
                type='nubmer'
                className={`${classes['product-number-input']} ${
                  disable && classes.disabled
                }`}
                value={product.countInStock === 0 ? 0 : qty}
                onChange={qtyHandler}
              />
              <button
                className={`${classes['product-count-dec']} ${
                  disable && classes.disabled
                }`}
                onClick={decreaseQty}
              >
                -
              </button>
            </div>
            <button
              className={`${classes['add-to-card']} ${
                disable && classes.disabled
              }`}
              onClick={addToCartHandler}
              disabled={disable ? true : false}
            >
              {disable ? 'موجود شد اطلاع بده' : 'افزودن به سبد خرید'}
            </button>
          </form>
          <Seprator />
          <p>{product.description}</p>
        </Card>
      )}
    </>
  );
};

export default ProductScrenn;
