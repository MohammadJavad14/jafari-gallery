/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { getOrderById } from '../actions/orderActions';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(7),
  },
}));

const PaymentResult = ({ match }) => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderCreate);
  useEffect(() => {
    dispatch(getOrderById(match.params.id));
  });
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        {order?.isPaid === true ? (
          <Alert>پرداخت شما با موفقیت انجام شد</Alert>
        ) : (
          <Alert severity="error">پرداخت موفقیت آمیز نبود</Alert>
        )}
      </Container>
    </Box>
  );
};

export default PaymentResult;
