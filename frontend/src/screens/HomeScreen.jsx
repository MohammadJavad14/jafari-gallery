/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { listProduct } from '../actions/productAcions';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import Product from '../components/Product';
import PopularProduct from '../components/PopularProduct';
import coin from '../styles/coin.png';
import stamp from '../styles/stamp.png';
import cash from '../styles/cash.png';
import album from '../styles/album.png';
import FooterMobile from '../components/UI/FooterMobile';
import Loader from '../components/UI/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const classes = HomeScreenStyles();
  return (
    <>
      <div className={classes.backgroundContainer}>
        <div className={classes.background} />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error.message}</h3>
      ) : (
        <>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={10}>
              <Typography variant="h4" className={classes.mainTitle}>
                کلکسیون دوست داشتنی خودت رو پیدا کن
              </Typography>
            </Grid>
            <Grid xs={2} item classes={{ item: classes.avatarContainer }}>
              <Avatar
                alt="user"
                classes={{
                  fallback: classes.avatarIcon,
                  root: classes.iconBackground,
                }}
              />
              <Typography className={classes.loginText}>ورود</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            direction="row"
            className={classes.gridContaier}
          >
            {products.map((product) => (
              // eslint-disable-next-line no-underscore-dangle
              <Product key={product._id} product={product} />
            ))}
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            classes={{ root: classes.popularContainer }}
          >
            <Grid item>
              <Typography style={{ fontWeight: 'bold' }}>
                محبوب ترین ها
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
          <Grid
            container
            spacing={2}
            direction="row"
            className={classes.gridContaier}
          >
            {products.map((product) => (
              // eslint-disable-next-line no-underscore-dangle
              <PopularProduct key={product._id} product={product} />
            ))}
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            classes={{ root: classes.popularContainer }}
          >
            <Grid item>
              <Typography style={{ fontWeight: 'bold' }}>
                دسته بندی ها
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
          <Grid
            container
            spacing={3}
            justifyContent="center"
            className={classes.categoriesContainer}
          >
            <Grid item>
              <Paper className={classes.categories}>
                <img
                  src={cash}
                  alt="اسکناس"
                  style={{ width: '4rem', objectFit: 'cover' }}
                />
                <IconButton classes={{ root: classes.leftArrowIcon }}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                className={classes.categories}
                style={{ backgroundColor: '#FE8668' }}
              >
                <img
                  src={album}
                  alt="آلبوم"
                  style={{ width: '3.5rem', objectFit: 'cover' }}
                />
                <IconButton classes={{ root: classes.leftArrowIcon }}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                className={classes.categories}
                style={{ backgroundColor: '#FDBC1F' }}
              >
                <img
                  src={stamp}
                  alt="تمبر"
                  style={{ width: '3.5rem', objectFit: 'cover' }}
                />
                <IconButton classes={{ root: classes.leftArrowIcon }}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                className={classes.categories}
                style={{ backgroundColor: '#4269F2' }}
              >
                <img
                  src={coin}
                  alt="سکه"
                  style={{ width: '4rem', objectFit: 'cover' }}
                />
                <IconButton classes={{ root: classes.leftArrowIcon }}>
                  <ArrowBackIosIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
      <FooterMobile />
    </>
  );
};

export default HomeScreen;
