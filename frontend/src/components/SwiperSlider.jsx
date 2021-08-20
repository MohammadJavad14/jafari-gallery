/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ProductScreenStyles from '../styles/ProductScreenStyles';

// Import Swiper styles
// import 'swiper/swiper-bundle.css';
// import 'swiper/swiper-bundle.min.css';
import '../styles/SwiperStyles.css';

// import 'swiper/swiper.scss';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Pagination]);

const SwiperSlider = ({ sliderImages, product }) => {
  const classes = ProductScreenStyles();

  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <Card>
            <CardMedia
              image={product.image}
              title={product.name}
              className={classes.media}
            />
          </Card>
        </SwiperSlide>
        {sliderImages?.map((image) => (
          <SwiperSlide>
            <Card>
              <CardMedia
                image={image}
                title={product.name}
                className={classes.media}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
