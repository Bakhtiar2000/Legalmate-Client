import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUserData';
import useAxiosSecure from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

const CaseDiv = ({ singleCase }) => {
    const { currentUser } = useAuth();
    const [userData] = useUsers();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    // console.log(currentUser)
    const { _id, writer, writer_id, email, location, status, practice_area, case_post } = singleCase
    // console.log(singleCase);
    const [receiverId, setReceiverId] = useState();

    useEffect(() => {
        const user = userData.find(user => user?.email === email)
        // console.log(user)
        setReceiverId(user?._id)
    }, [userData]);



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


    return (
        <div className='rounded-lg p-5 max-w-5xl bg-lightDark border border-primary mb-5 shadow-lg hover:shadow-white/40 duration-300 mx-auto'>
            <div className='flex justify-between items-center gap-5 mb-3 border border-primary px-3 py-2 rounded'>
                <div>
                    <p className='font-semibold text-lg'>{writer}</p>
                    <p>{location}</p>
                    <p className='text-sm'>Searching specialist in {practice_area}</p>
                </div>
                <div>
                    <button onClick={createChat} className='text-center px-4 py-2 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white'>
                        Message
                    </button>
                </div>
            </div>
            <p>{case_post}</p>
        </div>
    );
};

export default CaseDiv;