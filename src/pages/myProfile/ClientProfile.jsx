import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useCurrentClient from '../../hooks/useCurrentClient';
import CustomModal from '../../components/CustomModal';

const ClientProfile = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [currentClientData, clientLoading, refetch] = useCurrentClient();
    const [isBasicInfoModalOpen, setIsBasicInfoModalOpen]= useState()
    const {name, email, img, occupation, location}= currentClientData

    if (clientLoading || currentClientData === null) return <PageLoader />

    //Basic info Submit Complete
    const onBasicInfoSubmit = data => {
        const updateData = {
            email: email,
            name: data.name,
            location: data.location,
            occupation: data.occupation
        }
        console.log(updateData);
        // axiosSecure.patch('/attorney/basic', updateData)
        //     .then(res => {
        //         if (res.status === 200) {
        //             refetch();
        //             setIsBasicInfoModalOpen(false)
        //             // reset()
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })


    }
    const handleBasicInfoModal = (e) => {
        if (e == "cancel") setIsBasicInfoModalOpen(false)
    }
    
    return (
        <div className='container py-20 flex flex-col items-center gap-5'>
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

                <p className='text-lg mt-5'>Name: {name? name: "Not Found"}</p>
                <p>Email: {email? email: "Not Found"}</p>
                <p>Occupation: {occupation? occupation : "Not Found"}</p>
                <p>Location: {location? location: "Not Found"}</p>

                {/* Edit details button */}
                <button
                        onClick={() => setIsBasicInfoModalOpen(true)}
                        className="mt-auto w-max text-center px-5 py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white cursor-pointer"
                    >
                        Edit Details
                </button>

                {
                isBasicInfoModalOpen &&
                <CustomModal
                    isModalOpen={isBasicInfoModalOpen}
                    setIsModalOpen={setIsBasicInfoModalOpen}
                    handleModal={handleBasicInfoModal}
                >
                    <form className='text-black' onSubmit={handleSubmit(onBasicInfoSubmit)}>
                        <h3 className="font-bold text-xl mb-2">Update Your Basic Profile Information</h3>
                        <p className='border-t border-dark mb-5'></p>

                            {/* Name */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Name:</label>
                                <input
                                    {...register("name")}
                                    defaultValue={name}
                                    placeholder='Your full name'
                                    className='w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
                                />
                            </div>

                            {/* Location */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Location:</label>
                                <input
                                    {...register("location")}
                                    defaultValue={location}
                                    placeholder='e.g. Dhaka, Bangladesh'
                                    className='w-full border  text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
                                />
                            </div>

                            {/* Hourly rate */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Hourly rate:</label>
                                <input
                                    {...register("occupation")}
                                    defaultValue={occupation}
                                    placeholder='e.g. CEO, Vivasoft'
                                    className='w-full border text-black bg-white border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
                                />
                            </div>

                        <input
                            className="text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-2 sm:mt-5 cursor-pointer"
                            type="submit"
                            value="Save Changes"
                        />
                    </form>
                </CustomModal>
            }
            </div>
    );
};

export default ClientProfile;