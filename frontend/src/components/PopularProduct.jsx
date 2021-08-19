/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GradeIcon from '@material-ui/icons/Grade';
import PopularProductStyles from '../styles/PopularProductStyles';

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types

const PopularProduct = ({ product }) => {
  const classes = PopularProductStyles();

  return (
    <>
      <Grid item>
        <Card className={classes.card} elevation={3}>
          <CardMedia
            image={product.image}
            title="classor1"
            className={classes.media}
          />
          <IconButton classes={{ root: classes.favoriteIcon }}>
            <FavoriteBorderIcon />
          </IconButton>
          <CardContent classes={{ root: classes.cardContent }}>
            <Typography className={classes.productName}>
              {product.name}
            </Typography>
            <Grid
              container
              alignItems="center"
              classes={{ root: classes.priceContainer }}
            >
              <Grid item>
                <Typography variant="h6" classes={{ root: classes.price }}>
                  {`${product.price.toLocaleString('fa-IR')} تومان`}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" classes={{ root: classes.oldPrice }}>
                  ۳۵۰‌‌‌‌,۰۰۰
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item>
                <GradeIcon
                  color="primary"
                  fontSize="small"
                  classes={{ root: classes.gradIcon }}
                />
              </Grid>
              <Grid item>
                <Typography className={classes.rateNumber}>
                  <strong>۵</strong>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PopularProduct;
