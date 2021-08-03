import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Row from '../components/UI/Row';
import Seprator from '../components/UI/Seprator';
import classes from './HomeScreen.module.css';
import Loader from '../components/UI/Loader';
import Header from '../components/Header';
const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <h5 className={classes.title}>جدید ترین محصولات گالری جعفری</h5>
          <Row>
            {products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </Row>
          <br />
          <Seprator />
          <br />
          <h5 className={classes.title}>محصولات پیشنهادی گالری حعفری</h5>
          <Row>
            {products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
