import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUserData';
import useAxiosSecure from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import useAttorneys from '../../hooks/useAttorneys';
import useClients from '../../hooks/useClients';
import usePaymentHistory from '../../hooks/usePaymentHistory';

const CaseDiv = ({ singleCase }) => {
    const { currentUser } = useAuth();
    const [userData] = useUsers();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [clientsData] = useClients();
    const [attorneysData] = useAttorneys();
    const [paymentSuccess, setPaymentSuccess] = useState();
    const [paymentData, paymentLoading, paymentRefetch] = usePaymentHistory();
    // console.log(currentUser)
    const { _id, writer, writer_id, email, location, status, practice_area, case_post } = singleCase;
    // console.log(singleCase);
    const [receiverId, setReceiverId] = useState();
    const [senderId, setSenderId] = useState();

    useEffect(() => {
        const user = userData.find(user => user?.email === email)
        // console.log(user)
        setReceiverId(user?._id)
    }, [userData]);


    useEffect(() => {
        if (currentUser?.role === "attorney") {
            const senderId = attorneysData?.filter(attorney => attorney.email === currentUser?.email)
            console.log(senderId)
            setSenderId(senderId[0]?._id)
        }
        else if (currentUser?.role === "client") {
            const senderId = clientsData?.filter(client => client.email === currentUser?.email)
            setSenderId(senderId[0]?._id)
        }
    }, [clientsData, currentUser, attorneysData]);

    console.log(paymentData)


    useEffect(() => {
        console.log("paystatus")
        paymentData?.map(pay => {
            console.log(pay)

            if (pay.target_role === "client") {
                const paymentStatus = pay.target_id === writer_id && pay.target_email === email && pay.sender_email === currentUser?.email && pay.sender_name === currentUser?.name && pay.isPaid === true
                console.log(paymentStatus)
                if (paymentStatus) {
                    setPaymentSuccess(true)
                }
            }
            else {

            }
        })

    }, [paymentLoading, singleCase, paymentData]);

    // console.log(paymentSuccess)
    const createChat = () => {
        console.log(currentUser._id)

        console.log(_id, receiverId)

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
            sender_id: senderId,
            sender_name: currentUser.name,
            sender_email: currentUser.email,
            sender_role: currentUser.role,
            target_id: writer_id,
            target_name: writer,
            target_email: email,
            target_role: currentUser?.role === "attorney" ? "client" : "attorney",
            tran_id: tran_id,
            amount: 500,

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



    return (
        <div className='rounded-lg p-5 max-w-5xl bg-lightDark border border-primary mb-5 shadow-lg hover:shadow-white/40 duration-300 mx-auto'>
            <div className='flex justify-between items-center gap-5 mb-3 border border-primary px-3 py-2 rounded'>
                <div>
                    <p className='font-semibold text-lg'>{writer}</p>
                    <p>{location}</p>
                    <p className='text-sm'>Searching specialist in {practice_area}</p>
                </div>
                <div>
                    {/* <button onClick={createChat} className='text-center px-4 py-2 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white'>
                        Message
                    </button> */}

                    {/* Message */}
                    {
                        paymentSuccess ?
                            <button onClick={createChat} className="lg:text-xl text-center">
                                <div className="mt-auto w-full bg-green-600 hover:bg-green-600/60 duration-300 rounded-lg px-2 py-3 cursor-pointer text-center">
                                    Message

                                </div>
                            </button>
                            :
                            <button
                                onClick={paymentHandle}
                                className="lg:text-xl text-center">
                                <div className="mt-auto w-full  bg-secondary hover:bg-secondary/60 duration-300 rounded-lg px-2 py-3 cursor-pointer text-center">
                                    Message 
                                </div>
                            </button>

                    }


                </div>
            </div>
            <p>{case_post}</p>
        </div>
    );
};

export default CaseDiv;