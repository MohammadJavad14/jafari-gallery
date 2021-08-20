/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GradeIcon from '@material-ui/icons/Grade';
import { Link } from 'react-router-dom';
import ProductStyles from '../styles/ProductStyles';

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types
const Product = ({ product }) => {
  const classes = ProductStyles();

  return (
    <>
      <Grid item>
        <Card
          className={classes.card}
          elevation={3}
          component={Link}
          to={`/product/${product._id}`}
        >
          <CardMedia
            image={product.image}
            title="classor1"
            className={classes.media}
          />
          <IconButton
            classes={{ root: classes.favoriteIcon }}
            component={Link}
            to="/"
          >
            <FavoriteBorderIcon />
          </IconButton>
          <CardContent classes={{ root: classes.cardContent }}>
            <Typography variant="h6">{product.name}</Typography>
            <Grid container justifyContent="space-around" alignItems="center">
              <Grid item xs={5}>
                <Typography variant="h6" classes={{ root: classes.price }}>
                  {`${product.price.toLocaleString('fa-IR')} تومان`}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" classes={{ root: classes.oldPrice }}>
                  ۳۵۰‌‌‌‌,۰۰۰
                </Typography>
              </Grid>
              <Grid item>
                <div className={classes.offAmount}> ۱۰٪ تخفیف</div>
              </Grid>
            </Grid>
            <Typography className={classes.description}>
              {product.description}
            </Typography>
            <Grid container alignItems="center" style={{ marginTop: '1rem' }}>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-around"
                style={{ marginBottom: '1rem' }}
              >
                <Grid item>
                  <GradeIcon
                    color="primary"
                    fontSize="small"
                    classes={{ root: classes.gradIcon }}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.rateNumber}>
                    <strong>{product.rating.toLocaleString('fa-IR')}</strong> (
                    {product.numReviews.toLocaleString('fa-IR')})
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.category}
                    component={Link}
                    to="/"
                  >
                    دسته بندی
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    classes={{
                      root: classes.addToCart,
                    }}
                  >
                    <Typography
                      classes={{
                        root: classes.addToCartTxt,
                      }}
                      component={Link}
                      to="/"
                    >
                      خرید
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Product;
