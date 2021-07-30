import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

import { logout } from '../actions/userAction';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const dropdownHandler = () => {
    setDropdownIsVisible(!dropdownIsVisible);
  };

  const logoutHandler = () => {
    dispatch(logout());
    setDropdownIsVisible(!dropdownIsVisible);
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
            <div className={classes.dropdown}>
              <button
                className={classes['dropdown-btn']}
                onClick={dropdownHandler}
              >
                <i className='fas fa-caret-down'></i>
                <h4 className={classes['user-name']}>{userInfo.name}</h4>
              </button>
              <div
                className={`${classes['dropdown-content']} ${
                  dropdownIsVisible && classes['dropdown-content-visible']
                }`}
              >
                <button onClick={dropdownHandler}>
                  <Link to='/profile'>حساب من</Link>
                </button>

                <button onClick={logoutHandler}>خروج</button>
              </div>
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
