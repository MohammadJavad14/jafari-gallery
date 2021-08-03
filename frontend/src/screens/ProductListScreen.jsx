import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Card from '../components/UI/Card';

import classes from './UserListScreen.module.css';
import Header from '../components/Header';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('آیا مطمئن هستید که محصول حذف شود؟')) {
      dispatch(deleteProduct(id));
    }
  };

  const creatProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Header />
      <Card className='l'>
        <h3 className={classes.title}>محصولات</h3>
        <div>
          <button onClick={creatProductHandler} className={classes['btn-add']}>
            <span>اضافه کردن محصول</span>
            <i
              className='fas fa-plus'
              style={{ color: 'white', marginRight: '8px', fontSize: 'larger' }}
            ></i>
          </button>
        </div>
      </Card>
      {loadingDelete && <Loader />}
      {errorDelete && { errorDelete }}
      {loadingCreate && <Loader />}
      {errorCreate && { errorCreate }}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          {products.map((product) => (
            <Card className='l' key={product._id}>
              <div className={classes['order-summery']}>
                <h5>شناسه :</h5>
                <h4>{product._id.toLocaleString('fa-IR')}</h4>
              </div>
              <div className={classes['order-summery']}>
                <h5>نام :</h5>
                <h5>{product.name}</h5>
              </div>
              <div className={classes['order-summery']}>
                <h5>قیمت :</h5>
                <h5>{`${product.price.toLocaleString('fa-IR')} تومان`}</h5>
              </div>
              <div className={classes['order-summery']}>
                <h5>دسته بندی :</h5>
                <h5>{product.category}</h5>
              </div>

              <Link to={`/admin/product/${product._id}/edit`}>
                <button className={classes['btn-edit']}>
                  <i className='fas fa-edit' style={{ color: 'white' }}></i>
                </button>
              </Link>
              <button
                className={classes['btn-delete']}
                onClick={() => deleteHandler(product._id)}
              >
                <i className='fas fa-trash' style={{ color: 'white' }}></i>
              </button>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
