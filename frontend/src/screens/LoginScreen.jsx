/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
import { login } from '../actions/userActions';

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

const LoginScreen = ({ location, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userLogin);
  const { userInfo } = useSelector((state) => state.userLogin);
  // const { error } = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const validationSchema = yup.object({
    email: yup
      .string('ایمیل خود را وارد کنید')
      .email('لطفا ایمیل معتبر وارد کنید')
      .required('وارد کردن ایمیل الزامی است'),
    password: yup
      .string('رمز عبور خود را وارد کنید')
      .min(6, 'رمز عبور حداقل باید ۶ کارکتر داشته باشد')
      .required('وارد کردن رمز عبور الزامی است'),
  });

  const formik = useFormik({
    initialValues: {
      email: 'admin@example.com',
      password: '123456',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: ({ email, password }) => {
      dispatch(login(email, password));
    },
  });
  return (
    <Box className={classes.root}>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Typography variant="h5">ورود</Typography>
          </Grid>
          <Grid item>
            <IconButton className={classes.closeBtn} component={Link} to="/">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="h4" className={classes.brand}>
          گالری جعفری
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            name="email"
            type="email"
            label="ایمیل"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            className={classes.input}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="password"
            name="password"
            type="password"
            label="رمز عبور"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
                ورود
              </Typography>
            )}
          </Button>
        </form>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography>
              ثبت نام نکرده اید؟{' '}
              <strong style={{ textDecoration: 'underline' }}>ثبت نام</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
            >
              فراموشی رمز
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginScreen;
