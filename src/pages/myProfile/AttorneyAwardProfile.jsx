import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useAxiosSecure from '../../hooks/useAxios';

const AttorneyAwardProfile = ({ id, refetch, award, index }) => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isAwardEditClicked, setIsAwardEditClicked] = useState(false);
    // Award delete and update
    const handleAwardDelete = (index) => {
        const data = {
            id: id,
            position: index
        }
        console.log("Deleting Awards", data);
        axiosSecure.patch(`/attorney/deleteAwd`, data)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    refetch()
                }
            })
            .catch(error => {
                console.log(error);
            })
        //TODO: delete operation
        console.log("Deleting Award", index);
    }

    const handleAwardUpdate = (data) => {
        const updatedAward = {
            name: data?.name,
            from: data?.from,
            year: data?.year
        }
        console.log(updatedAward);

        // TODO: update operation
        setIsAwardEditClicked(false)
        reset()
    }
    return (
        <div key={index} className='relative group border border-white/40 rounded shadow-lg shadow-primary/20 px-3 md:px-5 py-1 md:py-3'>
            {
                !isAwardEditClicked ?
                    <>
                        <p className='text-primary text-xl'>{award?.name}</p>
                        <p className=''>{award?.from}</p>
                        <p className='text-sm italic'>{award?.year}</p>
                    </> :
                    <form className='text-black' onSubmit={handleSubmit(handleAwardUpdate)}>

                        {/* name */}
                        <div className='w-full'>
                            <input
                                type='text'
                                defaultValue={award?.name}
                                {...register("name", { required: true })}
                                placeholder='Award Name'
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.name && 'border-2 border-red-500'}`}
                            />
                        </div>

                        {/* from */}
                        <div className='w-full'>
                            <input
                                type='text'
                                defaultValue={award?.from}
                                {...register("from", { required: true })}
                                placeholder='Given by'
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.from && 'border-2 border-red-500'}`}
                            />
                        </div>

                        {/* year */}
                        <div className='w-full'>
                            <input
                                type='number'
                                defaultValue={award?.year}
                                placeholder='Year'
                                {...register("year", { required: true })}
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.year && 'border-2 border-red-500'}`}
                            />
                        </div>

                        <div className='flex gap-2'>
                            <input
                                className="text-center px-2 bg-green-500 hover:bg-green-500/60 duration-300 rounded-lg text-sm text-white mt-2 cursor-pointer"
                                type="submit"
                                value="Save"
                            />
                            <button
                                className="text-center px-2 bg-red-500 hover:bg-red-500/60 duration-300 rounded-lg text-sm text-white mt-2 cursor-pointer"
                                onClick={() => setIsAwardEditClicked(false)}
                            >Cancel</button>

                        </div>
                    </form>
            }

            <button onClick={() => setIsAwardEditClicked(true)} className={`bg-primary/50 text-white hidden p-1 rounded-md absolute duration-300 hover:bg-primary shadow-lg text-sm shadow-purple/20 hover:shadow-white/20 ${isAwardEditClicked ? "" : "group-hover:inline-block group-hover:bottom-1 group-hover:right-8"}`}>
                <AiOutlineEdit />
            </button>
            <button onClick={() => handleAwardDelete(index)} className={`bg-primary/50 text-white hidden p-1 rounded-md absolute duration-300 hover:bg-primary shadow-lg text-sm shadow-purple/20 hover:shadow-white/20 ${isAwardEditClicked ? "" : "group-hover:inline-block group-hover:bottom-1 group-hover:right-1"}`}>
                <AiOutlineDelete />
            </button>
        </div>
    );
};

export default AttorneyAwardProfile;