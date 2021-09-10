/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { listProductDetails } from '../actions/productAcions';
import Rating from '../components/Rating';
import Loader from '../components/UI/Loader';
import AddToCartScreenStyles from '../styles/AddToCartScreenStyles';
import { addToCart, removeFromCart } from '../actions/cartActions';

const AddToCartScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.productDetails);
  const { error } = useSelector((state) => state.productDetails);
  const { product } = useSelector((state) => state.productDetails);
  const { cartItems } = useSelector((state) => state.cart);

  const colorName = product?.color?.length
    ? product?.color[0]?.colorName
    : null;
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(colorName);
  const [checked, setChecked] = useState(false);

  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    if (product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    }

    if (
      !loading &&
      cartItems.findIndex((x) => x.product === product._id) === -1
    ) {
      setChecked(false);
    }

    if (
      !loading &&
      cartItems.findIndex((x) => x.product === product._id) !== -1
    ) {
      setChecked(true);
    }
  }, [dispatch, match, cartItems, loading, product]);

  const classes = AddToCartScreenStyles();

  const handleColorBtn = (id) => {
    const colorIndex = product?.color.findIndex(
      (curColor) => curColor._id === id
    );
    setSelectedColor(colorIndex);
    const name = product?.color[colorIndex].colorName;
    setSelectedColorName(name);
  };

  const increaseQty = (id, qty, color, countInStock) => {
    const newQty = Math.min(qty + 1, countInStock);
    dispatch(addToCart(id, newQty, color));
  };

  const decreaseQty = (id, qty, color) => {
    const newQty = Math.max(qty - 1, 1);
    dispatch(addToCart(id, newQty, color));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error.message}</h3>
      ) : (
        <>
          <Card className={classes.card} elevation={0}>
            <Card>
              <CardMedia
                image={product?.image}
                title={product?.name}
                className={classes.media}
              />
            </Card>
            <IconButton
              classes={{ root: classes.leftArrowIcon }}
              component={Link}
              to="/"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton classes={{ root: classes.favoriteIcon }}>
              <Badge
                badgeContent={cartItems?.length?.toLocaleString('fa-IR')}
                color="secondary"
                invisible={cartItems?.length === 0}
              >
                <LocalMallOutlinedIcon />
              </Badge>
            </IconButton>
          </Card>
          <div style={{ padding: '1.5rem', paddingBottom: '0' }}>
            <Typography variant="h5" className={classes.productName}>
              {product?.name}
            </Typography>

            <Grid container alignItems="center">
              <Rating
                value={product?.rating}
                rateNumber={product?.numReviews}
              />
              <Grid item>
                <Typography className={classes.rateNumber}>
                  <strong>{product?.rating?.toLocaleString('fa-IR')}</strong> (
                  {`از ${product?.numReviews?.toLocaleString('fa-IR')} نظر`})
                </Typography>
              </Grid>
            </Grid>
            {product?.color?.length !== 0 && (
              <>
                <Typography classes={{ root: classes.color }}>رنگ</Typography>
                <Typography classes={{ root: classes.colorName }}>
                  {selectedColorName}
                </Typography>
                <Grid container spacing={1} style={{ marginBottom: '2rem' }}>
                  {product?.color?.map((curColor, index) => (
                    <Grid item>
                      <div
                        className={`${
                          selectedColor === index
                            ? classes.colorBtnContainerActive
                            : classes.colorBtnContainer
                        }`}
                      >
                        <div
                          key={curColor._id}
                          className={classes.colorBtn}
                          onClick={() => handleColorBtn(curColor._id)}
                          style={{
                            backgroundColor: `${curColor.colorValue}`,
                          }}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </div>

          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            className={classes.footer}
            style={{ display: `${checked === true ? 'none' : 'flex'}` }}
          >
            <Grid item>
              <Typography classes={{ root: classes.price }}>
                {`${product?.price?.toLocaleString('fa-IR')} تومان`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography classes={{ root: classes.oldPrice }}>
                ۳۵۰‌‌‌‌,۰۰۰
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.offAmount}> ۱۰٪ تخفیف</div>
            </Grid>
            <IconButton
              className={classes.addToCardBtn}
              onClick={() =>
                dispatch(addToCart(product._id, 1, selectedColorName))
              }
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Grid
              container
              alignItems="center"
              justifyContent="flex-start"
              className={classes.addToCartfooter}
            >
              <Grid item>
                <Button
                  onClick={() => {
                    dispatch(removeFromCart(product._id));
                    setChecked(false);
                  }}
                >
                  <Typography style={{ fontSize: '1rem', color: '#CBCBD4' }}>
                    حذف
                  </Typography>
                </Button>
              </Grid>
              <Grid item style={{ marginRight: 'auto' }}>
                <Button
                  variant="contained"
                  className={classes.goToCartBtn}
                  onClick={() => {
                    setDrawer(true);
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Grid item>
                      <Typography className={classes.addToCartTxt}>
                        سبد خرید
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        className={classes.price}
                      >{`${product?.price?.toLocaleString(
                        'fa-IR'
                      )} `}</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Slide>
          <Drawer
            anchor="bottom"
            open={drawer}
            onClose={() => {
              setDrawer(false);
            }}
            classes={{ paper: classes.drawerPaper }}
          >
            <Typography align="center" style={{ fontWeight: 800 }}>
              سبد خرید من
            </Typography>
            <CloseIcon
              className={classes.cartClose}
              onClick={() => {
                setDrawer(false);
              }}
            />

            <List>
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
                      <IconButton
                        id={item.product}
                        size="small"
                        classes={{ root: classes.changeQtyBtn }}
                        onClick={() => {
                          increaseQty(
                            item.product,
                            item.qty,
                            item.color,
                            item.countInStock
                          );
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
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
                    <Grid item>
                      <IconButton
                        id={item.product}
                        size="small"
                        classes={{ root: classes.changeQtyBtn }}
                        onClick={() => {
                          decreaseQty(item.product, item.qty, item.color);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Typography
                    style={{ fontWeight: 800, marginRight: '1rem' }}
                  >{`${item.price.toLocaleString('fa-IR')} `}</Typography>
                </ListItem>
              ))}
            </List>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={classes.checkoutContainer}
            >
              <Grid item>
                <Typography align="center" style={{ color: '#A6A6AA' }}>
                  جمع کل
                </Typography>
                <Typography style={{ fontWeight: 800, fontSize: '1.25rem' }}>
                  {cartItems
                    .reduce((acc, item) => item.price * item.qty + acc, 0)
                    .toLocaleString('fa-IR')}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.checkoutBtn}
                  onClick={() => {
                    checkoutHandler();
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Grid item>
                      <Typography className={classes.addToCartTxt}>
                        ادامه
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Drawer>
        </>
      )}
    </>
  );
};

export default AddToCartScreen;
