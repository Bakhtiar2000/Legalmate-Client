import React from 'react';
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const AttorneyDiv = ({attorney}) => {
    const {_id, name, img, about, practiceArea, contact, location, hourly_rate, license, experience, education, reviews, awards, website, facebook, linkedin, twitter, email }= attorney
    const presentEmployment= experience.filter(exp=> exp.end_year === "present")
    const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    console.log(_id);

    // rating style
    const myStyles = {
        itemShapes: Star,
        activeFillColor: "#ffb33e",
        inactiveFillColor: "#a78f6d",
    };

    return (
        <div className="relative group rounded-lg p-5 max-w-5xl bg-lightDark border border-primary mb-5 shadow-lg hover:shadow-white/40 duration-300 mx-auto md:flex gap-8">
            <div className='min-w-max'>
                {/* Image */}
                <img
                    className="w-48 h-60 object-cover rounded mx-auto border border-primary"
                    src={img}
                    alt=""
                />

                {/* Social Links */}
                <div className="flex justify-center gap-3 items-center mt-5">
                <a href={facebook} target="_blank" className="flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark duration-300 cursor-pointer">
                    <FaFacebookF />
                </a>
                <a href={linkedin} target="_blank" className="flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark duration-300 cursor-pointer">
                    <FaLinkedin />
                </a>
                <a href={twitter} target="_blank" className="flex justify-center items-center rounded-full border border-primary w-8 h-8 text-primary hover:bg-primary hover:text-dark duration-300 cursor-pointer">
                    <FaTwitter />
                </a>
                </div>
            </div>

            <div>
                {/* name and practice area */}
                <div className='sm:flex items-end gap-3 '>
                    <p className="hover:text-primary font-semibold text-2xl cursor-pointer duration-300 w-fit"> {name} </p>
                    <p>({practiceArea} Specialist)</p>
                </div>
                <p>{presentEmployment[0]?.company}</p>
                <p className="text-sm">{location}</p>

                {/* rating */}
                <div className="flex items-center gap-2 mt-2 mb-5">
                    <Rating
                    className="max-w-[110px]"
                    readOnly
                    value={reviews.length > 0 && averageRating}
                    itemStyles={myStyles}
                    />
                         <p className="font-bold text-orange-500">{averageRating}</p>
                    <span className="text-gray">({reviews.length} reviews)</span>
                </div>

                    < p className='text-orange-500'>Licensed for 35 years</p>
                    <p>{about}</p>
                </div>

            {/* TODO: add link address */}
            <Link to={`/attorney_details/${_id}`} className="bg-primary/50 text-white group-hover:inline-block hidden p-3 rounded-md absolute top-3 right-3 md:-right-16 group-hover:right-3 duration-300 hover:bg-primary shadow-xl shadow-purple/20 hover:shadow-white/20">
              <HiOutlineExternalLink size="20px" />
            </Link>
        </div>
    );
};

export default AttorneyDiv;