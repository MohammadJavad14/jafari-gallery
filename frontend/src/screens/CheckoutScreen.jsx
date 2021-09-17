/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, goToPayment } from '../actions/orderActions';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(3),
  },
  closeBtn: {
    padding: 0,
    position: 'absolute',
    top: '1.75rem',
    right: '1.5rem',
  },
  brand: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(3),

    textAlign: 'center',
  },
  input: {
    marginTop: theme.spacing(4),
    '& .MuiOutlinedInput-root': {
      borderRadius: '1rem',
      '&.Mui-focused fieldset': {
        borderColor: '#5FA1D5',
        color: '#5FA1D5',
      },
    },
  },
  loginBtn: {
    height: '3rem',
    backgroundColor: '#FFE202',
    borderRadius: '1rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#FFE202',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  cartCard: {
    width: '4.375rem',
    backgroundColor: '#F8F7FA',
  },
  cartMedia: {
    width: '4.375rem',
    height: '4.25rem',
    backgroundSize: '3.5rem',
  },
  qtyInput: {
    width: '1.5rem',
    textAlign: 'center',
  },
  changeQtyBtn: {
    width: '1.5rem',
    height: '1.5rem',
    border: '1px solid #ccc',
  },
  checkoutContainer: {
    height: '6rem',
    borderTop: '1px solid #F8F7FA',
  },
  checkoutBtn: {
    width: '14rem',
    height: '3rem',
    backgroundColor: '#FFE202',
    borderRadius: '1rem',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#FFE202',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    },
  },
}));

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { payURL } = useSelector((state) => state.goToPayment);
  const { loading: payLoading } = useSelector((state) => state.goToPayment);
  const { order } = useSelector((state) => state.orderCreate);

  const { loading: orderCreateLoading } = useSelector(
    (state) => state.orderCreate
  );
  const { success } = useSelector((state) => state.orderCreate);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => item.price * item.qty + acc,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 100000 ? 0 : 25000;
  cart.taxPrice = cart.itemsPrice * 0.09;
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  const createOrderHandler = () => {
    console.log(cart.shippingAddress);
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (!payLoading && !orderCreateLoading && success) {
      dispatch(goToPayment(order._id));
    }
  }, [orderCreateLoading, success]);

  useEffect(() => {
    if (!payLoading && payURL) {
      window.location.href = payURL?.url;
    }
  }, [payLoading, payURL]);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography variant="h5">پیش فاکتور</Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.closeBtn} component={Link} to="/">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: '2rem' }}
        >
          <Grid item>
            <Typography style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              روش پرداخت
            </Typography>
          </Grid>
          <Grid item>
            <img
              src="https://cdn.zarinpal.com/badges/trustLogo/1.svg"
              alt="پرداخت امن با زرین پال"
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: '1rem' }}
        >
          <Grid item>
            <Typography style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
              آدرس
            </Typography>
          </Grid>
          <Grid item>
            <Link
              underline="always"
              color="textPrimary"
              to="/shipping"
              style={{
                color: '#A6A6AA',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
            >
              ویرایش
            </Link>
          </Grid>
        </Grid>
        <Typography style={{ fontWeight: 800, marginTop: '1rem' }}>
          {shippingAddress.country}
        </Typography>
        <Typography style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          {shippingAddress.city}
        </Typography>
        <Typography style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          {shippingAddress.address}
        </Typography>
        <Typography style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          {shippingAddress.postalCode}
        </Typography>
        {cartItems.length === 0 ? (
          <Alert severity="error">
            <Typography display="inline"> سبد خرید شما خالی است </Typography>
            <Link to="/" style={{ marginRight: '0.5rem' }}>
              بازگشت
            </Link>
          </Alert>
        ) : (
          <>
            <List style={{ marginTop: '1rem' }}>
              {cartItems.map((item) => (
                <ListItem key={item.product} disableGutters>
                  <Card className={classes.cartCard} elevation={0}>
                    <CardMedia
                      image={item.image}
                      title={item.name}
                      className={classes.cartMedia}
                    />
                  </Card>
                  <Typography
                    style={{ width: '5.5rem', marginRight: '0.7rem' }}
                  >
                    {item.name}
                  </Typography>
                  <Grid
                    container
                    alignItems="center"
                    style={{ width: 'auto', marginRight: '0.7rem' }}
                  >
                    <Grid item>
                      <Input
                        id={item.product}
                        disableUnderline
                        value={item.qty.toLocaleString('fa-IR')}
                        classes={{
                          root: classes.qtyInput,
                          input: classes.qtyInput,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Typography
                    style={{ fontWeight: 800, marginRight: '1rem' }}
                  >{`${item.price.toLocaleString('fa-IR')} تومان`}</Typography>
                  <DeleteOutlineIcon
                    style={{ marginRight: 'auto' }}
                    onClick={() => {
                      dispatch(removeFromCart(item.product));
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: '1rem' }}
            >
              <Grid item>
                <Typography
                  style={{
                    color: '#A6A6AA',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                >
                  هزینه ارسال
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                >
                  {`${cart.shippingPrice.toLocaleString('fa-IR')} تومان`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: '1rem' }}
            >
              <Grid item>
                <Typography
                  style={{
                    color: '#A6A6AA',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                >
                  مالیات
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                >
                  {`${cart.taxPrice.toLocaleString('fa-IR')} تومان`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: '1rem' }}
            >
              <Grid item>
                <Typography
                  style={{
                    color: '#A6A6AA',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  جمع کل
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                >
                  {`${cart.totalPrice.toLocaleString('fa-IR')} تومان`}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className={classes.loginBtn}
              onClick={createOrderHandler}
            >
              {payLoading || orderCreateLoading ? (
                <CircularProgress size={30} />
              ) : (
                <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  تایید و انتقال به درگاه پرداخت
                </Typography>
              )}
            </Button>
          </>
        )}
      </Container>
    </Box>
  );
};

export default CheckoutScreen;
