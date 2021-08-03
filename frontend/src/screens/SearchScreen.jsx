import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../components/SearchBox';
import { Route } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Card from '../components/UI/Card';
import Row from '../components/UI/Row';

import classes from './SearchScreen.module.css';

const SearchScreen = ({ match }) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div className={classes.container}>
      <Route render={({ history }) => <SearchBox history={history} />} />
      {products.map((product) => (
        <Card className='ss' key={product.product}>
          <div className={classes['img-container']}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={classes['product-details']}>
            <h5 className={classes['product-name']}>{product.name}</h5>
            <Row>
              <h5 className={classes['product-stock']}>
                {product.countInStock < 1
                  ? 'ناموجود'
                  : product.countInStock < 6
                  ? `فقط ${product.countInStock} عدد باقی مانده `
                  : 'موجود در انبار'}
              </h5>
            </Row>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SearchScreen;
