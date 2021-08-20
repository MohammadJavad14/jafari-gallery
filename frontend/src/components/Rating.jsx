/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import StarHalfOutlinedIcon from '@material-ui/icons/StarHalfOutlined';

import ProductScreenStyles from '../styles/ProductScreenStyles';

const Rating = ({ value }) => {
  const classes = ProductScreenStyles();

  return (
    <Grid item>
      {value >= 1 ? (
        <GradeIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : value >= 0.5 ? (
        <StarHalfOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : (
        <StarOutlineOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      )}
      {value >= 2 ? (
        <GradeIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : value >= 1.5 ? (
        <StarHalfOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : (
        <StarOutlineOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      )}
      {value >= 3 ? (
        <GradeIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : value >= 2.5 ? (
        <StarHalfOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : (
        <StarOutlineOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      )}
      {value >= 4 ? (
        <GradeIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : value >= 3.5 ? (
        <StarHalfOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : (
        <StarOutlineOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      )}
      {value >= 5 ? (
        <GradeIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : value >= 4.5 ? (
        <StarHalfOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      ) : (
        <StarOutlineOutlinedIcon
          color="primary"
          fontSize="small"
          classes={{ root: classes.gradIcon }}
        />
      )}
    </Grid>
  );
};

export default Rating;
