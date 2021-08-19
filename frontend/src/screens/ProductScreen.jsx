/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import { Link } from 'react-router-dom';
import { listProductDetails } from '../actions/productAcions';
import Rating from '../components/Rating';
import ProductScreenStyles from '../styles/ProductScreenStyles';

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const classes = ProductScreenStyles();

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardMedia
          image={product.image}
          title={product.name}
          className={classes.media}
        />
        <IconButton
          classes={{ root: classes.leftArrowIcon }}
          component={Link}
          to="/"
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton classes={{ root: classes.favoriteIcon }}>
          <FavoriteBorderIcon />
        </IconButton>
      </Card>
      <Typography variant="h5" className={classes.productName}>
        {product.name}
      </Typography>
      <Typography className={classes.productBrand}>{product.brand}</Typography>
      <Rating value="3.5" className={classes.ratingContainer} />
    </>
  );
};

export default ProductScreen;
