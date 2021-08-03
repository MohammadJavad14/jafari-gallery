import React from 'react';
import { Link } from 'react-router-dom';
import Card from './UI/Card';
import Rating from './Rating';

const Product = ({ product }) => {
  const persianPrice = product.price.toLocaleString('fa-IR');
  return (
    <Card className='s'>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
        <h6>
          <strong style={{ fontSize: 'small' }}>{product.name}</strong>
        </h6>
        <Rating
          value={product.rating}
          text={`از ${product.numReviews.toLocaleString('fa-IR')} امتیاز`}
        />
        <h4>{` ${persianPrice}  تومان `}</h4>
      </Link>
    </Card>
  );
};

export default Product;
