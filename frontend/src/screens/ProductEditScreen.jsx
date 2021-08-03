import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/UI/Loader';
import { listProductsDetails, updateProduct } from '../actions/productActions';

import Card from '../components/UI/Card';

import classes from './RegisterScreen.module.css';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Header from '../components/Header';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });

      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(`${error} upload errorrrrr`);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Header />
      <div className={classes['form-container']}>
        <Card className='l'>
          <h3 className={classes['form-title']}>ویرایش محصول</h3>
          {loadingUpdate && <Loader />}
          {errorUpdate && { errorUpdate }}
          {error && <h5>{error}</h5>}
          {loading && <Loader />}
          <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-tag`}></i>
              <input
                type='name'
                placeholder='نام محصول زا وارد کنید'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={classes['input']}
              />
            </div>
            <div className={classes['input-container']}>
              <i
                className={`${classes['login-icons']}  fas fa-dollar-sign`}
              ></i>
              <input
                type='number'
                placeholder='قیمت محصول وارد کنید'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={classes['input']}
              />
            </div>
            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-image`}></i>
              <input
                type='text'
                placeholder='آدرس عکس را وارد کنید'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className={classes['input']}
              />
            </div>

            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-image`}></i>
              <input
                type='file'
                placeholder='آدرس عکس را وارد کنید'
                onChange={uploadFileHandler}
                className={classes['input']}
              />
            </div>
            {uploading && <Loader />}

            <div className={classes['input-container']}>
              <i className={`${classes['login-icons']}  fas fa-copyright`}></i>
              <input
                type='text'
                placeholder='برند محصول را وارد کنید'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className={classes['input']}
              />
            </div>

            <div className={classes['input-container']}>
              <i
                className={`${classes['login-icons']}  fas fa-layer-group`}
              ></i>
              <input
                type='number'
                placeholder='تعداد محصول وارد کنید'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className={classes['input']}
              />
            </div>

            <div className={classes['input-container']}>
              <i
                className={`${classes['login-icons']}  fas fa-object-group`}
              ></i>
              <input
                type='text'
                placeholder='دسته بندی محصول را وارد کنید'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={classes['input']}
              />
            </div>

            <div className={classes['input-container']}>
              <i
                className={`${classes['login-icons']}  fas fa-quote-right`}
              ></i>
              <input
                type='textarea'
                placeholder=' توضیحات محصول را وارد کنید'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={classes['input']}
              />
            </div>

            <button type='submit' className={classes['btn-submit']}>
              ویرایش
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ProductEditScreen;
