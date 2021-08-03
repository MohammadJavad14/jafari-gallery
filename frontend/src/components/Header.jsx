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
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  const dropdownHandler = () => {
    setDropdownIsVisible(!dropdownIsVisible);
    setOverlayIsVisible(!overlayIsVisible);
  };

  const overlayHandler = () => {
    setOverlayIsVisible(!overlayIsVisible);
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
          <Link to='/'>
            <h3 className={classes.brand}>گالری جعفری</h3>
          </Link>
          {dropdownHandler && userInfo ? (
            <>
              <div
                className={`${classes.overlay} ${
                  overlayIsVisible && classes['overlay-visible']
                }`}
                onClick={overlayHandler}
              ></div>
              <div className={classes.dropdown}>
                <button
                  className={classes['dropdown-btn']}
                  onClick={dropdownHandler}
                >
                  <i
                    className='far fa-user-circle'
                    style={{ fontSize: '400%' }}
                  ></i>
                </button>
                <div
                  className={`${classes['dropdown-content']} ${
                    dropdownIsVisible && classes['dropdown-content-visible']
                  }`}
                >
                  <h4 className={classes['user-name']}>{userInfo.name}</h4>
                  <button onClick={dropdownHandler}>
                    <Link to='/profile'>حساب من</Link>
                  </button>

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <h4 className={classes['user-name']}>ادمین</h4>
                      <button onClick={dropdownHandler}>
                        <Link to='/admin/userlist'>کاربرها</Link>
                      </button>
                      <button onClick={dropdownHandler}>
                        <Link to='/admin/productlist'>محصولات</Link>
                      </button>
                      <button onClick={dropdownHandler}>
                        <Link to='/admin/orderlist'>سفارشات</Link>
                      </button>
                    </>
                  )}

                  <button onClick={logoutHandler}>خروج</button>
                </div>
              </div>
            </>
          ) : (
            <Link to='/login'>
              <button>
                <i
                  className='far fa-user-circle'
                  style={{ fontSize: '400%' }}
                ></i>
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
