import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/UI/Card';
import Seprator from '../components/UI/Seprator';
import Row from '../components/UI/Row';
import Loader from '../components/UI/Loader';
import classes from './ProductScreen.module.css';
import { halfSpace } from '@persian-tools/persian-tools';

import Rating from '../components/Rating';
import Message from '../components/UI/Message';

import {
  listProductsDetails,
  createProductReview,
} from '../actions/productActions';

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductScrenn = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  if (product.countInStock < 1) {
    disable = true;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (successProductReview) {
      alert('دیدگاه شما ثبت شد');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  const persianPrice = product.price?.toLocaleString('fa-IR');
  const colors = product.color?.map((c) => Object.entries(c));
  const productStock = product.countInStock;

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
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
          <h3>دیدگاه کاربران</h3>
          {product.reviews.length === 0 && (
            <Card className='l'>دیدگاهی ثبت نشده است</Card>
          )}
          {product.reviews.map((review) => (
            <Card key={review._id} className='l'>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <h5>
                {new Date(review.createdAt).toLocaleTimeString('fa-IR')}
                {' , '}
                {new Date(review.createdAt).toLocaleDateString('fa-IR')}
              </h5>
              <p>{review.comment}</p>
            </Card>
          ))}
          <h3>دیدگاه خود را ثبت کنید</h3>
          {errorProductReview && <Message>{errorProductReview}</Message>}
          <Card className='l'>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <label htmlFor='rating' className={classes.label}>
                  امتیاز محصول :{' '}
                </label>
                <select
                  id='rating'
                  type='select'
                  className={`${classes['product-number-input']}}`}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value=''>انتخاب کنید</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
                <div>
                  <label htmlFor='comment' className={classes.label}>
                    نظر خود را وارد کنید :
                  </label>
                  <textarea
                    name='comment'
                    id='comment'
                    cols='45'
                    rows='8'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className={classes.textarea}
                  ></textarea>
                </div>
                <button className={classes['btn-review']}>ثبت دیدگاه</button>
              </form>
            ) : (
              <Message>
                برای ثبت دیدگاه لطفا <Link to='/login'>وارد</Link> شوید
              </Message>
            )}
          </Card>
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductScrenn;
