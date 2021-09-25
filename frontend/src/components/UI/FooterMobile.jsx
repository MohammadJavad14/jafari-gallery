/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 600,
    height: '4rem',
  },
  footerContainer: {
    position: 'fixed',
    width: '100%',
    // maxWidth: 600,
    bottom: 0,
    zIndex: 4,
  },
  indicator: {
    backgroundColor: '#3A3A3A',
    top: 0,
    height: 3,
  },
  labelIcon: {
    color: '#ccc',
  },
});

const FooterMobile = () => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.tabs);

  const handleChange = (newValue) => {
    dispatch({
      type: 'CHANGE_ACTIVE_TAB',
      payload: newValue,
    });
    localStorage.setItem('activeTab', JSON.stringify(newValue));
  };

  const classes = useStyles();
  return (
    <Paper square className={classes.footerContainer}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="footer mobile"
        className={classes.root}
        classes={{ indicator: classes.indicator }}
      >
        <Tab
          icon={<HomeOutlinedIcon />}
          aria-label="home"
          className={classes.root}
          classes={{ textColorPrimary: classes.labelIcon }}
          component={Link}
          to="/"
        />
        <Tab
          icon={<FavoriteBorderOutlinedIcon />}
          aria-label="favorites"
          className={classes.root}
          classes={{ textColorPrimary: classes.labelIcon }}
        />
        <Tab
          icon={<SearchOutlinedIcon />}
          aria-label="search"
          className={classes.root}
          classes={{ textColorPrimary: classes.labelIcon }}
        />
        <Tab
          icon={<LocalOfferOutlinedIcon />}
          aria-label="orders"
          className={classes.root}
          classes={{ textColorPrimary: classes.labelIcon }}
          component={Link}
          to="/orders"
        />
        <Tab
          icon={<LocalMallOutlinedIcon />}
          aria-label="cart"
          className={classes.root}
          classes={{ textColorPrimary: classes.labelIcon }}
        />
      </Tabs>
    </Paper>
  );
};

export default FooterMobile;
