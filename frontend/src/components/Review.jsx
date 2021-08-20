/* eslint-disable react/prop-types */
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import ReviewsStyles from '../styles/ReviewsStyles';
import Rating from './Rating';

const Review = ({ reviews }) => {
  const classes = ReviewsStyles();
  return (
    <div>
      <Accordion
        variant="outlined"
        classes={{ root: classes.reviewsContainer }}
      >
        <AccordionSummary classes={{ root: classes.reviewsSummery }}>
          <Typography className={classes.reviewsTitle}>نظر کاربران</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.reviewsDetails }}>
          <Grid container>
            {reviews.map((review) => (
              <div>
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
                <Grid container>
                  <Grid item>
                    <Typography>کالای با کیفیت</Typography>
                  </Grid>
                  <Grid item>
                    <Rating value={review.rating} />
                  </Grid>
                </Grid>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem, id inventore expedita commodi laudantium alias soluta
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
