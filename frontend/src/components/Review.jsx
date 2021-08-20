/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import ReviewsStyles from '../styles/ReviewsStyles';
import Rating from './Rating';

const Review = ({ reviews }) => {
  const [accordinoOpen, setAccordionOpen] = useState(false);
  const openHandler = () => {
    setAccordionOpen(true);
  };
  // if (reviews?.length === 0) {
  //   setAccordionOpen(true);
  // }
  const classes = ReviewsStyles();
  const firstThreeReviews = reviews.slice(0, 3);
  const remainReviews = reviews.slice(3);
  return (
    <div>
      <Typography className={classes.reviewsTitle}>نظر کاربران</Typography>
      {firstThreeReviews.map((review) => (
        <div key={review._id} style={{ width: '100%', margin: '0.75rem 0' }}>
          <Grid container alignItems="center">
            <Grid item className={classes.reviewNameContainer}>
              <Avatar
                alt={review.name}
                src="/userimage.png"
                className={classes.gold}
              />
            </Grid>
            <Grid item direction="column">
              <Grid item>
                <Typography variant="h6" className={classes.reviewName}>
                  {review.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.reviewDate}>
                  {new Date(review.createdAt).toLocaleString('fa-IR')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: '0.5rem' }}
          >
            <Grid item>
              <Typography variant="h6" className={classes.commentTitle}>
                کالای با کیفیت
              </Typography>
            </Grid>
            <Grid item>
              <Rating value={review.rating} />
            </Grid>
          </Grid>
          <Typography className={classes.comment}>{review.comment}</Typography>
        </div>
      ))}
      {reviews.length === 0 && (
        <Typography color="secondary">
          برای این محصول نظری ثبت نشده است
        </Typography>
      )}
      <Accordion
        variant="outlined"
        classes={{ root: classes.reviewsContainer }}
      >
        {!accordinoOpen && reviews.length !== 0 && (
          <AccordionSummary classes={{ root: classes.reviewsSummery }}>
            <Button
              variant="contained"
              className={classes.seeMoreBtn}
              onClick={openHandler}
            >
              مشاهده همه نظرات
            </Button>
          </AccordionSummary>
        )}

        <AccordionDetails classes={{ root: classes.reviewsDetails }}>
          <Grid container>
            {remainReviews.map((review) => (
              <div
                key={review._id}
                style={{ width: '100%', margin: '0.75rem 0' }}
              >
                <Grid container alignItems="center">
                  <Grid item className={classes.reviewNameContainer}>
                    <Avatar
                      alt={review.name}
                      src="/userimage.png"
                      className={classes.gold}
                    />
                  </Grid>
                  <Grid item direction="column">
                    <Grid item>
                      <Typography variant="h6" className={classes.reviewName}>
                        {review.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.reviewDate}>
                        {new Date(review.createdAt).toLocaleString('fa-IR')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ marginTop: '0.5rem' }}
                >
                  <Grid item>
                    <Typography variant="h6" className={classes.commentTitle}>
                      کالای با کیفیت
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Rating value={review.rating} />
                  </Grid>
                </Grid>
                <Typography className={classes.comment}>
                  {review.comment}
                </Typography>
              </div>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Review;
