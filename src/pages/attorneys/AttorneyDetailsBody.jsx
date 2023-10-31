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
import usePaymentHistory from "../../hooks/usePaymentHistory";
import PageLoader from "../../components/PageLoader";
import { useNavigate } from "react-router-dom";

const AttorneyDetailsBody = ({ singleAttorney }) => {
    // console.log(singleAttorney)
    const navigate = useNavigate();
    const { _id, name, img, about, practiceArea, location, hourly_rate, license, experience, education, reviews, awards, email } = singleAttorney
    const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const currentYear = new Date().getFullYear();

    const [paymentData, paymentLoading, paymentRefetch] = usePaymentHistory();

    const [userData] = useUsers();
    const { currentUser } = useAuth()
    const [receiverId, setReceiverId] = useState();
    const [axiosSecure] = useAxiosSecure();
    const [paymentSuccess, setPaymentSuccess] = useState()

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
        console.log(chatMembers);
        if (receiverId === undefined || currentUser?._id === undefined) {
            return
        }
        axiosSecure
            .post("/chat", chatMembers)
            .then((res) => {
                console.log(res.data)
                navigate("/messages");
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const paymentHandle = () => {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        const tran_id = `${timestamp}${random}`
        console.log(tran_id)
        const paymentInfo = {
            attorneyID: _id,
            attorneyName: name,
            attorneyEmail: email,
            clintName: currentUser.name,
            clintEmail: currentUser.email,
            practiceArea: practiceArea,
            amount: 500,
            tran_id: tran_id,

        }
        console.log(paymentInfo)
        axiosSecure.post('/payment', paymentInfo)
            .then(res => {
                console.log("res.data", res.data)
                window.location.replace(res.data.url)
            })
            .catch(error => {
                console.log(error)
            })

    }

    console.log(paymentData)
    useEffect(() => {

        paymentData?.map(pay => {
            const paymentStatus = pay.attorneyID === _id && pay.attorneyEmail === email && pay.clintEmail === currentUser?.email && pay.clintName === currentUser.name && pay.isPaid === true

            if (paymentStatus) {
                paymentRefetch()
                setPaymentSuccess(true)
            }

            console.log("paymentStatus", paymentStatus)

        })

    }, [paymentLoading]);

    return (
        <div className='container py-20' >

            {/* Top section */}
            <div className='w-fit mx-auto md:flex gap-8 rounded p-5 bg-lightDark'>
                {/* Image and social Links */}
                <div className='min-w-max'>
                    {/* Image */}
                    {
                        img ?
                            <img
                                className="w-64 h-80 object-cover rounded mx-auto border border-primary"
                                src={img}
                                alt=""
                            /> :
                            <img
                                className='w-64 h-80 object-cover rounded mx-auto border border-primary'
                                src="https://i.ibb.co/wNJtyRX/image-14.png"
                            />
                    }
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
                                <p className="font-bold text-orange-500">{reviews.length !== 0 && averageRating.toFixed(1)}</p>
                                <span className="text-gray">({reviews.length})</span>
                            </div>
                        </div>

                        {/* License information */}
                        <div className="bg-lightDark/50 rounded-lg p-3 md:ml-5 border border-dashed border-white h-fit w-fit">
                            <p className="text-2xl border-b pb-3 border-dark mb-5">Licensed for {currentYear - license?.acquired_year} years</p>

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
                                    <p>{license.state}</p>
                                    <p>{license.acquired_year}</p>
                                    <p className="text-green-500">{license.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    {
                        about &&
                        <div className="bg-primary/20 px-5 py-3 rounded-lg max-w-2xl">
                            <p>{about}</p>
                        </div>
                    }

                    {/* Message */}
                    {
                        paymentSuccess ?
                            <button onClick={createChat} className="lg:text-xl text-center">
                                <div className="mt-auto w-full bg-green-600 hover:bg-green-800 duration-300 rounded-lg px-2 py-3 cursor-pointer text-center">
                                    Message

                                </div>
                            </button>
                            :
                            <button onClick={paymentHandle} className="lg:text-xl text-center">
                                <div className="mt-auto w-full bg-red-600 hover:bg-green-800 duration-300 rounded-lg px-2 py-3 cursor-pointer text-center">
                                    Message
                                </div>
                            </button>

                    }


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
                        <AttorneyReviews reviews={reviews} email={email} paymentSuccess={paymentSuccess} name={name}></AttorneyReviews>
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