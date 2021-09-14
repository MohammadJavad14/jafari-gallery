/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { saveShippingAddress } from '../actions/cartActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
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
}));

const ShippingScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userLogin);
  // const { userInfo } = useSelector((state) => state.userLogin);
  // const { error } = useSelector((state) => state.userLogin);
  const { shippingAddress } = useSelector((state) => state.cart);

  //   const redirect = location.search ? location.search.split('=')[1] : '/';
  //   useEffect(() => {
  //     if (userInfo) {
  //       history.push(redirect);
  //     }
  //   }, [history, userInfo, redirect]);

  const validationSchema = yup.object({
    country: yup.string().required('وارد کردن استان الزامی است'),
    city: yup.string().required('وارد کردن شهر الزامی است'),
    address: yup.string().required('وارد کردن آدرس الزامی است'),
    postalCode: yup.string().required('وارد کردن کدپستی الزامی است'),
  });

  const formik = useFormik({
    initialValues: {
      country: shippingAddress.country,
      city: shippingAddress.city,
      address: shippingAddress.address,
      postalCode: shippingAddress.postalCode,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(saveShippingAddress(values));
      history.push('/checkout');
    },
  });
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography variant="h5">مشخصات پستی</Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.closeBtn} component={Link} to="/">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="h4" className={classes.brand}>
          مشخصات پستی
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            id="country"
            name="country"
            label="استان"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
            className={classes.input}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="city"
            name="city"
            label="شهر"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            classes={{ root: classes.input }}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="address"
            name="address"
            label="آدرس"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            classes={{ root: classes.input }}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="postalCode"
            name="postalCode"
            label="کد پستی"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            error={
              formik.touched.postalCode && Boolean(formik.errors.postalCode)
            }
            helperText={formik.touched.postalCode && formik.errors.postalCode}
            classes={{ root: classes.input }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={classes.loginBtn}
          >
            {loading ? (
              <CircularProgress size={30} />
            ) : (
              <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                ثبت و ادامه
              </Typography>
            )}
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default ShippingScreen;
