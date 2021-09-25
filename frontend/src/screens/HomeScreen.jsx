/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { listProduct } from '../actions/productActions';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import Product from '../components/Product';
import PopularProduct from '../components/PopularProduct';
import coin from '../styles/coin.png';
import stamp from '../styles/stamp.png';
import cash from '../styles/cash.png';
import album from '../styles/album.png';
import FooterMobile from '../components/UI/FooterMobile';
import Loader from '../components/UI/Loader';
import { logout } from '../actions/userActions';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.productList);
  const { error } = useSelector((state) => state.productList);
  const { products } = useSelector((state) => state.productList);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [anchor, setAnchor] = useState(null);

  const handleClick = (event) => {
    if (!userInfo) {
      history.push('/login');
    }
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAnchor(true);
  };

  // const handleClose = () => {
  //   setAnchor(null);
  // };

  useEffect(() => {
    dispatch(listProduct());
    dispatch({
      type: 'CHANGE_ACTIVE_TAB',
      payload: 0,
    });
    localStorage.setItem('activeTab', JSON.stringify(0));
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
            <Grid
              xs={2}
              item
              classes={{ item: classes.avatarContainer }}
              style={{ textDecoration: 'none', color: '#000' }}
              onClick={handleClick}
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <Avatar
                alt="user"
                classes={{
                  fallback: classes.avatarIcon,
                  root: classes.iconBackground,
                }}
              />
              <Typography className={classes.loginText}>ورود</Typography>
            </Grid>
            <SwipeableDrawer
              anchor="right"
              open={anchor}
              onClose={() => {
                setAnchor(false);
              }}
              onOpen={() => {
                setAnchor(true);
              }}
            >
              <div style={{ width: '12rem', paddingTop: '1rem' }}>
                <List>
                  <ListItem classes={{ root: classes.userName }}>
                    <Typography style={{ fontWeight: 700 }}>
                      {userInfo?.name}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="حساب کاربری" />
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        dispatch(logout());
                        setAnchor(false);
                      }}
                    >
                      خروج
                    </Button>
                  </ListItem>
                </List>
              </div>
            </SwipeableDrawer>
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
