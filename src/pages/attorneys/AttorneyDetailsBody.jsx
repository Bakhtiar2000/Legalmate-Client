import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BiCurrentLocation } from "react-icons/bi";
import { TbLicense } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr";
import AttorneyReviews from "./AttorneyReviews";
import AttorneyEducation from "./AttorneyEducation";
import AttorneyExperience from "./AttorneyExperience";
import AttorneyAwards from "./AttorneyAwards";
import useUsers from "../../hooks/useUserData";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxios";

const AttorneyDetailsBody = ({ singleAttorney }) => {
    const { _id, name, img, about, practiceArea, contact, location, hourly_rate, license, experience, education, reviews, awards, website, facebook, linkedin, twitter, email } = singleAttorney
    const presentEmployment = experience.filter(exp => exp.end_year === "present")
    const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const [userData, UserDataLoading, refetch] = useUsers();
    const { currentUser } = useAuth()
    const [receiverId, setReceiverId] = useState();
    const [axiosSecure] = useAxiosSecure();
    console.log(userData)
    // rating style
    const myStyles = {
        itemShapes: Star,
        activeFillColor: "#ffb33e",
        inactiveFillColor: "#a78f6d",
    };

    const sections = ['Reviews', 'Experience', 'Education', 'Awards']
    const initialIndex = sections.indexOf('Reviews')
    const [tabIndex, setTabIndex] = useState(initialIndex)

    useEffect(() => {
        const user = userData.find(user => user?.email === email)

        setReceiverId(user?._id)
    }, [userData, singleAttorney]);

    const createChat = () => {
        // console.log("receiver",receiverId);
        // console.log("sender" ,currentUser?._id);
        const chatMembers = {
            sender: currentUser?._id,
            receiver: receiverId,
        };
        // console.log(chatMembers);
        if (receiverId === undefined || currentUser?._id === undefined) {
            return
        }
        axiosSecure
            .post("/chat", chatMembers)
            .then((res) => {
                console.log(res.data)
                // navigate("/dashboard/messages");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='container py-20' >

            {/* Top section */}
            <div className='w-fit mx-auto md:flex gap-8 rounded p-5 bg-lightDark'>
                {/* Image and social Links */}
                <div className='min-w-max'>
                    {/* Image */}
                    <img
                        className="w-64 h-80 object-cover rounded mx-auto border border-primary"
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

                <div className="flex flex-col gap-8">
                    {/* Basic info and license */}
                    <div className="md:flex justify-between gap-8 mt-5 md:mt-0">

                        {/* Name, practice area, location, rating */}
                        <div>
                            <p className='text-4xl'>{name}</p>
                            <p className="lg:text-xl md:mt-2">{practiceArea} attorney at {location}</p>
                            <p className="lg:text-xl md:mt-2">Hourly rate: <span className="text-orange-500">{hourly_rate}</span></p>

                            {/* rating */}
                            <div className="flex items-center gap-2 mt-2 mb-5">
                                <Rating
                                    className="max-w-[110px]"
                                    readOnly
                                    value={reviews.length > 0 && averageRating}
                                    itemStyles={myStyles}
                                />
                                <p className="font-bold text-orange-500">{averageRating}</p>
                                <span className="text-gray">({reviews.length})</span>
                            </div>
                        </div>

                        {/* License information */}
                        <div className="bg-lightDark/50 rounded-lg p-3 md:ml-5 border border-dashed border-white h-fit w-fit">
                            <p className="text-2xl border-b pb-3 border-dark mb-5">Licensed for {license[0]?.licensed_for} years</p>

                            <div className="flex items-center gap-5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <BiCurrentLocation />
                                        <p>State</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <TbLicense />
                                        <p>Acquired</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <GrStatusGoodSmall fill="green" />
                                        <p>Status</p>
                                    </div>
                                </div>

                                <div>
                                    <p>{license[0]?.state}</p>
                                    <p>{license[0]?.acquired_year}</p>
                                    <p className="text-green-500">{license[0]?.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="bg-primary/20 px-5 py-3 rounded-lg max-w-2xl">
                        <p>{about}</p>
                    </div>

                    {/* Contact Information */}
                    <div className="flex justify-center gap-5 items-center">
                        <div className="w-full bg-green-900 rounded-lg px-5 py-3">
                            <p className="lg:text-xl text-center">Contact: {contact}</p>
                        </div>
                        <div className="w-full bg-orange-900 rounded-lg px-5 py-3">
                            <p className="lg:text-xl text-center">Email: {email}</p>
                        </div>
                        <div className="w-full bg-orange-900 rounded-lg px-2 py-3">
                            <button onClick={createChat} className="lg:text-xl text-center">
                                Message
                            </button>

                        </div>
                    </div>
                </div>
            </div>


            {/* Bottom Section */}
            <div className="mt-10">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Reviews</Tab>
                        <Tab>Education</Tab>
                        <Tab>Experience</Tab>
                        <Tab>Awards</Tab>
                    </TabList>
                    <TabPanel>
                        <AttorneyReviews reviews={reviews}></AttorneyReviews>
                    </TabPanel>
                    <TabPanel>
                        <AttorneyEducation education={education}></AttorneyEducation>
                    </TabPanel>
                    <TabPanel>
                        <AttorneyExperience experience={experience}></AttorneyExperience>
                    </TabPanel>
                    <TabPanel>
                        <AttorneyAwards awards={awards}></AttorneyAwards>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default AttorneyDetailsBody;