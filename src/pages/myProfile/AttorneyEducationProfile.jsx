import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useAxiosSecure from '../../hooks/useAxios';

const AttorneyEducationProfile = ({ id, refetch, edu, index, validateEndingDate }) => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
    const [present, setPresent] = useState(false);
    const [isEducationEditClicked, setIsEducationEditClicked] = useState(false);
    // Education delete and update

    const handleEducationDelete = (index) => {
        const data = {
            id: id,
            position: index
        }
        console.log("Deleting education", data);
        axiosSecure.patch(`/attorney/deleteEdu`, data)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    refetch()
                }
            })
            .catch(error => {
                console.log(error);
            })


    }

    const handleEducationUpdate = (data) => {
        const updatedEducation = {

            updatedEducation: {
                institution: data?.institution,
                subject: data?.subject,
                start_year: data?.edu_start_year,
                end_year: data?.edu_end_year,
            }
        }
            // TODO: update operation
            setIsEducationEditClicked(false)
        reset()
        }
        return (
            <div key={index} className='relative group border border-white/40 rounded shadow-lg shadow-primary/20 px-5 py-3'>
                {
                    !isEducationEditClicked ?
                        <>
                            <p className='text-primary text-xl'>{edu?.institution}</p>
                            <p className=''>{edu?.subject}</p>
                            <p className='text-sm italic'>{edu?.start_year} - {edu?.end_year}</p>
                        </> :
                        <form className='text-black' onSubmit={handleSubmit(handleEducationUpdate)}>
                            <div className='sm:flex gap-2'>
                                {/* Institution name */}
                                <div className='w-full'>
                                    <input
                                        type='text'
                                        defaultValue={edu?.institution}
                                        {...register("institution", { required: true })}
                                        placeholder='Institution'
                                        className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.institution && 'border-2 border-red-500'}`}
                                    />
                                </div>

                                {/* Subject */}
                                <div className='w-full'>
                                    <input
                                        type='text'
                                        defaultValue={edu?.subject}
                                        {...register("subject", { required: true })}
                                        placeholder='Subject'
                                        className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.subject && 'border-2 border-red-500'}`}
                                    />
                                </div>
                            </div>

                            <div className='sm:flex gap-2'>
                                {/* Start year */}
                                <div className='w-full'>
                                    <input
                                        type='number'
                                        defaultValue={edu?.start_year}
                                        placeholder='Start year'
                                        {...register("edu_start_year", { required: true })}
                                        className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.edu_start_year && 'border-2 border-red-500'}`}
                                    />
                                </div>

                                {/* End year */}
                                <div className='w-full'>
                                    {
                                        present ?
                                            <input
                                                value='Present'
                                                readOnly
                                                {...register("edu_end_year", { required: true })}
                                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.edu_end_year && 'border-2 border-red-500'}`}
                                            /> :
                                            <>
                                                <input
                                                    type='number'
                                                    defaultValue={edu?.end_year}
                                                    placeholder='End year'
                                                    {...register("edu_end_year", { required: true, validate: (value) => validateEndingDate(value, watch("edu_start_year")) })}
                                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors?.edu_end_year?.type === "required" && 'border-2 border-red-500'}`}
                                                />
                                                {errors?.edu_end_year?.type === 'validate' && <span className='text-red-500 text-sm duration-300'>Invalid End year</span>}
                                            </>
                                    }

                                    {/* Checkbox for present */}
                                    <label className='flex gap-2 justify-end text-sm text-white'>
                                        <input
                                            type="checkbox"
                                            onChange={e => {
                                                setPresent(e.target.checked);
                                                console.log(e.target.checked);
                                                if (e.target.checked) {
                                                    setValue('edu_end_year', 'Present')
                                                } else {
                                                    setValue('edu_end_year', '')
                                                }
                                            }}
                                        />
                                        Currently studying here
                                    </label>
                                </div>
                            </div>
                            <div className='flex gap-2 -mt-5'>
                                <input
                                    className="text-center px-2 bg-green-500 hover:bg-green-500/60 duration-300 rounded-lg text-sm text-white mt-2 cursor-pointer"
                                    type="submit"
                                    value="Save"
                                />
                                <button
                                    className="text-center px-2 bg-red-500 hover:bg-red-500/60 duration-300 rounded-lg text-sm text-white mt-2 cursor-pointer"
                                    onClick={() => setIsEducationEditClicked(false)}
                                >Cancel</button>

                            </div>
                        </form>
                }

                <button onClick={() => setIsEducationEditClicked(true)} className={`bg-primary/50 text-white hidden p-1 rounded-md absolute duration-300 hover:bg-primary shadow-lg text-sm shadow-purple/20 hover:shadow-white/20 ${isEducationEditClicked ? "" : "group-hover:inline-block group-hover:bottom-1 group-hover:right-8"}`}>
                    <AiOutlineEdit />
                </button>
                <button onClick={() => handleEducationDelete(index)} className={`bg-primary/50 text-white hidden p-1 rounded-md absolute duration-300 hover:bg-primary shadow-lg text-sm shadow-purple/20 hover:shadow-white/20 ${isEducationEditClicked ? "" : "group-hover:inline-block group-hover:bottom-1 group-hover:right-1"}`}>
                    <AiOutlineDelete />
                </button>
            </div>
        );
    };

    export default AttorneyEducationProfile;