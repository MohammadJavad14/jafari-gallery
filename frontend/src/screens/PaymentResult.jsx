/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import { getOrderById, getPayResult } from '../actions/orderActions';
import Loader from '../components/UI/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(30),
  },
  btn: {
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
  footer: {
    width: '100%',
    height: '6rem',
    padding: theme.spacing(2),
    position: 'fixed',
    zIndex: 5,
    bottom: 0,
  },
}));

const PaymentResult = ({ match, history }) => {
  const dispatch = useDispatch();
  const { orderDetail } = useSelector((state) => state.orderDetail);
  const { loading } = useSelector((state) => state.orderDetail);
  // const { payResult } = useSelector((state) => state.paymentResult);
  const { loading: payResultLoading } = useSelector(
    (state) => state.paymentResult
  );

  useEffect(() => {
    dispatch(getPayResult(match.params.id));
  }, [dispatch]);

  useEffect(() => {
    if (!payResultLoading) {
      dispatch(getOrderById(match.params.id));
      dispatch({
        type: CART_CLEAR_ITEMS,
      });
      localStorage.removeItem('cartItems');
    }
  }, [payResultLoading]);

  const myOrderHandler = () => {
    history.push('/login?redirect=orders');
  };

  const classes = useStyles();
  return (
    <Box className={classes.root} alignItems="center">
      {loading || payResultLoading || !orderDetail ? (
        <Loader />
      ) : orderDetail.isPaid === true ? (
        <>
          <Alert style={{ margin: '1rem' }}>
            پرداخت شما با موفقیت انجام شد
          </Alert>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={classes.footer}
          >
            <Grid item style={{ width: '100%' }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.btn}
                onClick={myOrderHandler}
              >
                <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  پیگیری سفارش
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Alert severity="error" style={{ margin: '1rem' }}>
            پرداخت موفقیت آمیز نبود لطفا بعد از چند دقیقه دوباره امتحان کنید
          </Alert>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={classes.footer}
          >
            <Grid item style={{ width: '100%' }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className={classes.btn}
                // onClick={createOrderHandler}
              >
                <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  رفتن به سبد خرید
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default PaymentResult;
