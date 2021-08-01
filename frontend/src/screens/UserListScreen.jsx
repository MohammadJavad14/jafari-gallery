import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { listUsers } from '../actions/userAction';
import Card from '../components/UI/Card';
import { Table } from 'react-bootstrap';

import classes from './UserListScreen.module.css';
const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log('delete');
  };
  return (
    <div>
      <h3 className={classes.title}>کاربرها</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          {users.map((user) => (
            <Card className='l' key={user._id}>
              <div className={classes['order-summery']}>
                <h5>شناسه :</h5>
                <h4>{user._id.toLocaleString('fa-IR')}</h4>
              </div>
              <div className={classes['order-summery']}>
                <h5>نام :</h5>
                <h4>{user.name}</h4>
              </div>
              <div className={classes['order-summery']}>
                <h5>ایمیل :</h5>
                <h5>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </h5>
              </div>
              <div className={classes['order-summery']}>
                <h5>ادمین :</h5>
                <h5>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </h5>
              </div>

              <Link to={`/user/${user._id}`}>
                <button className={classes['btn-edit']}>
                  <i className='fas fa-edit' style={{ color: 'white' }}></i>
                </button>
              </Link>
              <button
                className={classes['btn-delete']}
                onClick={() => deleteHandler(user._id)}
              >
                <i className='fas fa-trash' style={{ color: 'white' }}></i>
              </button>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default UserListScreen;
