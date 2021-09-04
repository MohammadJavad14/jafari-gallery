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
import Slide from '@material-ui/core/Slide';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { listProduct, listProductDetails } from '../actions/productAcions';
import Rating from '../components/Rating';
import Review from '../components/Review';
import Product from '../components/Product';
import Loader from '../components/UI/Loader';
import AddToCartScreenStyles from '../styles/AddToCartScreenStyles';
import SwiperSlider from '../components/SwiperSlider';

const AddToCartScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading: productListLoading, products } = productList;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedColorName, setSelectedColorName] = useState(
    product.color[0].colorName
  );
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    dispatch(listProduct());

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const classes = AddToCartScreenStyles();

  const handleColorBtn = (id) => {
    const colorIndex = product.color.findIndex(
      (curColor) => curColor._id === id
    );
    setSelectedColor(colorIndex);
    const name = product.color[colorIndex].colorName;
    setSelectedColorName(name);
  };

  return (
    <>
      {loading || productListLoading ? (
        <Loader />
      ) : error ? (
        <h3>{error.message}</h3>
      ) : (
        <>
          <Card className={classes.card} elevation={0}>
            <Card>
              <CardMedia
                image={product.image}
                title={product.name}
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
              <LocalMallOutlinedIcon />
            </IconButton>
          </Card>
          <div style={{ padding: '1.5rem', paddingBottom: '0' }}>
            <Typography variant="h5" className={classes.productName}>
              {product.name}
            </Typography>

            <Grid container alignItems="center">
              <Rating value={product.rating} rateNumber={product.numReviews} />
              <Grid item>
                <Typography className={classes.rateNumber}>
                  <strong>{product.rating?.toLocaleString('fa-IR')}</strong> (
                  {`از ${product.numReviews?.toLocaleString('fa-IR')} نظر`})
                </Typography>
              </Grid>
            </Grid>
            {product.color.length !== 0 && (
              <>
                <Typography classes={{ root: classes.color }}>رنگ</Typography>
                <Typography classes={{ root: classes.colorName }}>
                  {selectedColorName}
                </Typography>
                <Grid container spacing={2} style={{ marginBottom: '2rem' }}>
                  {product.color.map((curColor, index) => (
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
                {`${product.price?.toLocaleString('fa-IR')} تومان`}
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
              onClick={() => setChecked(true)}
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
                <Typography style={{ fontSize: '1rem', color: '#CBCBD4' }}>
                  حذف
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: 'auto' }}>
                <Button variant="contained" className={classes.goToCartBtn}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Grid
                      item
                      component={Link}
                      to={`/addtocart/${product._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Typography className={classes.addToCartTxt}>
                        رفتن به سبد خرید
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        className={classes.price}
                      >{`${product.price?.toLocaleString(
                        'fa-IR'
                      )} `}</Typography>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Slide>
        </>
      )}
    </>
  );
};

export default AddToCartScreen;
