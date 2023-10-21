import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Reviews = () => {
    const ourReviews= [
        {
            id: 1,
            name: "Rashed Mia",
            img: "https://img.freepik.com/free-photo/portrait-happy-male-with-broad-smile_176532-8175.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            job: "CEO, Mustang",
            review: "Wonderful platform that simplifies connecting with lawyers from various practice areas. The user-friendly interface and efficient matching system are top-notch."
        },
        {
            id: 2,
            name: "Mariam Khatun",
            img: "https://img.freepik.com/free-photo/smiling-redhead-girl-with-long-hair-pale-natural-skin-no-make-up-smile-white-teeth-standing-plaid-shirt-looking-happy-white-background_176420-45542.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            job: "Businesswoman",
            review: "A game-changer for finding legal support. The lawyers I've connected with were highly knowledgeable and responsive. A valuable resource for any entrepreneur."
        },
        {
            id: 3,
            name: "Karim Bhuiyan",
            img: "https://img.freepik.com/free-photo/young-man-cool-guy-with-brunette-hair-piercing-bristle-wearing-khaki-color-sweater-have-confident-smile-emotional-concept-isolated-white-wall_295783-15317.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            job: "Journalist",
            review: "A valuable resource for journalists like me. The platform is intuitive, and I appreciate the diverse range of legal experts available."
        },
        {
            id: 4,
            name: "Jamshed Mojumder",
            img: "https://img.freepik.com/free-psd/studio-portrait-young-teenage-boy_23-2150162529.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais",
            job: "Software Engineer, Vivasoft",
            review: "Vivasoft has benefited greatly from this platform. It simplifies the process of finding lawyers for various legal needs, and the quality of lawyers available is impressive."
        }
    ]
    return (
        <section className='mx-2 pb-5 lg:pb-10'>
            <SectionTitle  title="Client" redTitle="Reviews" para="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ratione id dolores velit tenetur. Illo." />
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {
                    ourReviews.map(review=>
                        <SwiperSlide key={review.id}>
                            <div className='duration-300 h-72 bg-lightDark rounded-lg p-3 md:py-5 md:px-8 border border-slate-500 shadow-lg max-w-4xl mx-auto'>
                               
                               <div className='flex items-center gap-5 my-5'>
                                <img className='w-16 md:w-20 h-16 md:h-20 object-cover rounded-full mb-3' src={review.img} alt="" />
                                    <div>
                                        <p className='text-xl md:text-2xl font-semibold md:mb-2'>{review.name}</p>
                                        <p className='text-slate-500'>{review.job}</p>
                                    </div>
                               </div>

                               <p className='mb-5 italic text-base lg:text-xl'>"{review.review}"</p>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
};

export default Reviews;