import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

import { logout } from '../actions/userAction';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <nav className={classes['main-nav']}>
        <div className={classes['menu']}>
          <Link to='/menu'>
            <button>
              <i className={`${classes['menu-icon']} fas fa-bars`}></i>
            </button>
          </Link>
          <Link to='/'>
            <h3 className={classes.brand}>گالری جعفری</h3>
          </Link>
          {userInfo ? (
            <div>
              <h4>{userInfo.name}</h4>
              <Link to='/profile'>
                <button> حساب من</button>
              </Link>

              <button onClick={logoutHandler}>خروج</button>
            </div>
          ) : (
            <Link to='/login'>
              <button>
                <i class='fas fa-sign-in-alt'></i>
              </button>
            </Link>
          )}
        </div>
        <form action='search' className={classes['header-search-form']}>
          <input
            type='text'
            placeholder='جستجو در محصولات'
            className={classes['main-search-box']}
          />
          <button>
            <i className={`${classes['search-icon']} fas fa-search`}></i>
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
