/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import { listProduct, listProductDetails } from '../actions/productAcions';
import Rating from '../components/Rating';
import Review from '../components/Review';
import Product from '../components/Product';
import Loader from '../components/UI/Loader';
import ProductScreenStyles from '../styles/ProductScreenStyles';
import SwiperSlider from '../components/SwiperSlider';

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading: productListLoading, products } = productList;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    dispatch(listProduct());

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const classes = ProductScreenStyles();

  return (
    <>
      {loading || productListLoading ? (
        <Loader />
      ) : error ? (
        <h3>{error.message}</h3>
      ) : (
        <>
          <Card className={classes.card} elevation={0}>
            <SwiperSlider
              product={product}
              sliderImages={product.sliderImages}
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
          <div style={{ padding: '1.5rem', paddingBottom: '0' }}>
            <Typography variant="h5" className={classes.productName}>
              {product.name}
            </Typography>
            <Typography className={classes.productBrand}>
              {product.brand}
            </Typography>
            <Grid container alignItems="center">
              <Rating value={product.rating} rateNumber={product.numReviews} />
              <Grid item>
                <Typography className={classes.rateNumber}>
                  <strong>{product.rating?.toLocaleString('fa-IR')}</strong> (
                  {`از ${product.numReviews?.toLocaleString('fa-IR')} نظر`})
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="h6" className={classes.productDescription}>
              توضیحات
            </Typography>
            <Typography className={classes.description}>
              {product.description}
            </Typography>
            <Review reviews={product.reviews} />
          </div>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            classes={{ root: classes.popularContainer }}
          >
            <Grid item>
              <Typography style={{ fontWeight: 'bold' }}>
                محصولات مرتبط
              </Typography>
            </Grid>
            <Grid item>
              <Link
                underline="always"
                color="textPrimary"
                to="/"
                style={{ color: '#A6A6AA', fontWeight: 'bold' }}
              >
                مشاهده همه
              </Link>
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.gridContaier}>
            {products.map((currProduct) => (
              // eslint-disable-next-line no-underscore-dangle
              <Product key={currProduct._id} product={currProduct} />
            ))}
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
            className={classes.footer}
          >
            <Grid item>
              <Button variant="contained" className={classes.addToCardBtn}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Grid item>
                    <Typography className={classes.addToCartTxt}>
                      افزودن به سبد خرید
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      className={classes.price}
                    >{`${product.price?.toLocaleString('fa-IR')} `}</Typography>
                  </Grid>
                </Grid>
              </Button>
            </Grid>
            <Grid item>
              <IconButton className={classes.addToFavoriteBtn}>
                <FavoriteBorderIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ProductScreen;
