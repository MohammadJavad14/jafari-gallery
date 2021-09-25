/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import FooterMobile from '../components/UI/FooterMobile';
import { listProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';
import Loader from '../components/UI/Loader';
import { getMyOrders } from '../actions/orderActions';
import { logout } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  header: {
    height: '6rem',
    backgroundColor: '#FFE202',
    padding: theme.spacing(3),
  },
  avatarIcon: {
    color: '#000',
  },
  iconBackground: {
    background: '#ffffff',
    width: '2rem',
    height: '2rem',
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
  listItem: {
    boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.035)',
    borderRadius: '1rem',
  },
  orderList: {
    padding: theme.spacing(3),
    boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.05)',
  },
}));

const MyOrdersScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);

  const { myOrders } = useSelector((state) => state.orderMyDetail);
  const { loading } = useSelector((state) => state.orderMyDetail);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch(getMyOrders());
    dispatch({
      type: 'CHANGE_ACTIVE_TAB',
      payload: 3,
    });
    localStorage.setItem('activeTab', JSON.stringify(3));
  }, [dispatch]);

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

  const classes = useStyles();
  return (
    <>
      <header className={classes.header}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ marginTop: '1.5rem' }}
        >
          <Grid item>
            <Typography variant="h6">سفارش های من</Typography>
          </Grid>
          <Grid
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
      </header>
      {userInfo ? (
        <div>
          {loading || !myOrders ? (
            <Loader />
          ) : (
            <>
              <Box className={classes.root}>
                <List>
                  {myOrders.length === 0 ? (
                    <Alert severity="error">سفارشی وجود ندارد</Alert>
                  ) : (
                    myOrders?.map((order) => (
                      <div key={order._id} className={classes.orderList}>
                        <Grid
                          container
                          justifyContent="space-between"
                          style={{ marginBottom: '1rem' }}
                        >
                          <Grid item>
                            <Typography>شماره سفارش</Typography>
                          </Grid>
                          <Grid item>
                            <Typography>{order._id}</Typography>
                          </Grid>
                        </Grid>
                        {order.isDelivered ? (
                          <Alert style={{ marginBottom: '1rem' }}>
                            سفارش در {order.deliverdAt} تحویل داده شد
                          </Alert>
                        ) : (
                          <Alert
                            severity="error"
                            style={{ marginBottom: '1rem' }}
                          >
                            سفارش تحویل داده نشده است
                          </Alert>
                        )}
                        {order.orderItems.map((item) => (
                          <ListItem
                            key={item.product}
                            disableGutters
                            className={classes.listItem}
                          >
                            <Card className={classes.cartCard} elevation={0}>
                              <CardMedia
                                image={item.image}
                                title={item.name}
                                className={classes.cartMedia}
                              />
                            </Card>
                            <Grid container direction="column">
                              <Grid item>
                                <Typography style={{ marginRight: '0.7rem' }}>
                                  {item.name}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography
                                  style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 800,
                                    marginRight: '1rem',
                                  }}
                                >
                                  {`${item.price?.toLocaleString(
                                    'fa-IR'
                                  )} تومان`}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography
                                  style={{
                                    fontSize: '0.875rem',
                                    marginRight: '0.7rem',
                                  }}
                                >
                                  {item.color}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                        ))}
                      </div>
                    ))
                  )}
                </List>
              </Box>
            </>
          )}
        </div>
      ) : (
        <Alert severity="info" style={{ margin: '0.5rem', marginTop: '2rem' }}>
          برای مشاهده سفارش های خود لطفا وارد شوید
        </Alert>
      )}
      <FooterMobile />
    </>
  );
};

export default MyOrdersScreen;
