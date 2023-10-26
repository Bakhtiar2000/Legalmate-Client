import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const AttorneyReviews = ({ reviews }) => {
    // const {name, review, rating, date} = reviews
    console.log(reviews);
    // rating style
    const myStyles = {
        itemShapes: Star,
        activeFillColor: "#ffb33e",
        inactiveFillColor: "#a78f6d",
    };

    return (
        <div className='p-5 rounded-lg bg-lightDark'>
            <Swiper
                pagination={{
                clickable: true,
                }}
                breakpoints={{
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    }
                  }}
                modules={[Pagination]}
                className="mySwiper"
            >

                {
                    reviews.map((review, index)=> 
                    <SwiperSlide key={index}>
                        <div className='duration-300 h-full bg-lightDark rounded-lg p-3 md:py-5 md:px-8 border border-slate-500 shadow-lg max-w-4xl mx-auto'>
                           <div className='flex items-center justify-between gap-5 mb-5'>
                                <div>
                                    <p className='text-xl md:text-2xl font-semibold md:mb-2'>{review.name}</p>
                                    <p className='text-slate-500'>{review.date}</p>
                                </div>
                                {/* rating */}
                                <Rating
                                    className="max-w-[110px]"
                                    readOnly
                                    value={review.rating}
                                    itemStyles={myStyles}
                                />
                           </div>
    
                            <p className='mb-5 italic'>"{review.review}"</p>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default AttorneyReviews;