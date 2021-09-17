/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';
import Loader from '../components/UI/Loader';
import { getMyOrders } from '../actions/orderActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
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
}));

const MyOrdersScreen = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.orderMyDetail);
  const { loading } = useSelector((state) => state.orderMyDetail);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  console.log(myOrders);
  const classes = useStyles();
  return (
    <div>
      {loading || !myOrders ? (
        <Loader />
      ) : (
        <>
          <Typography>سفارشات من</Typography>
          <List>
            {myOrders?.map((order) => (
              <div key={order._id} style={{ border: '1px solid #000' }}>
                {order.orderItems.map((item) => (
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
                          value={item.qty?.toLocaleString('fa-IR')}
                          classes={{
                            root: classes.qtyInput,
                            input: classes.qtyInput,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      style={{ fontWeight: 800, marginRight: '1rem' }}
                    >{`${item.price?.toLocaleString('fa-IR')} `}</Typography>
                  </ListItem>
                ))}
              </div>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default MyOrdersScreen;
