import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useAxiosSecure from '../../hooks/useAxios';

const AttorneyExperienceProfile = ({ exp,id, refetch, index, validateEndingDate }) => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
    const [present, setPresent] = useState(false);
    const [isExperienceEditClicked, setIsExperienceEditClicked] = useState(false);
    // experience delete and update
    const handleExperienceDelete = (index)=>{
        const data = {
            id: id,
            position: index
        }
        console.log("Deleting experience", data);
        axiosSecure.patch(`/attorney/deleteExp`, data)
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

    const handleExperienceUpdate = (data)=>{
        const updatedExperience={
            company : data?.company,
            position : data?.position,
            start_year : data?.exp_start_year,
            end_year : data?.exp_end_year,
        }
        console.log(updatedExperience);

        // TODO: update operation
        setIsExperienceEditClicked(false)
        reset()
    }
    return (
        <div key={index} className='relative group border border-white/40 rounded shadow-lg shadow-primary/20 px-3 md:px-5 py-1 md:py-3'>
            {
                !isExperienceEditClicked?
                <>
                    <p className='text-primary text-xl'>{exp?.company}</p>
                    <p className=''>{exp?.position}</p>
                    <p className='text-sm italic'>{exp?.start_year} - {exp?.end_year}</p>

                </>:
                <form className='text-black' onSubmit={handleSubmit(handleExperienceUpdate)}>
                    <div className='sm:flex gap-2'>
                        {/* company name */}
                        <div className='w-full'>
                            <input
                                type='text'
                                defaultValue={exp?.company}
                                {...register("company", {required: true})}
                                placeholder='Company'
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.company && 'border-2 border-red-500'}`}
                            />
                        </div>

                        {/* position */}
                        <div className='w-full'>
                            <input
                                type='text'
                                defaultValue={exp?.position}
                                {...register("position", {required: true})}
                                placeholder='Position'
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.position && 'border-2 border-red-500'}`}
                            />
                        </div>
                    </div>

                    <div className='sm:flex gap-2'>
                        {/* Start year */}
                        <div className='w-full'>
                            <input
                                type='number'
                                defaultValue={exp?.start_year}
                                placeholder='Start year'
                                {...register("exp_start_year", {required: true})}
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.exp_start_year && 'border-2 border-red-500'}`}
                            />
                        </div>

                        {/* End year */}
                        <div className='w-full'>
                            {
                                present?
                                <input
                                    value='Present'
                                    readOnly
                                    {...register("exp_end_year", {required: true})}
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors.exp_end_year && 'border-2 border-red-500'}`}
                                />:
                                <>
                                <input
                                    type='number'
                                    defaultValue={exp?.end_year}
                                    placeholder='End year'
                                    {...register("exp_end_year", {required: true,  validate: (value) => validateEndingDate(value, watch("exp_start_year"))})}
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 ${errors?.exp_end_year?.type === "required" && 'border-2 border-red-500'}`}
                                />
                                {errors?.exp_end_year?.type === 'validate' && <span className='text-red-500 text-sm duration-300'>Invalid End year</span>}
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
                                            setValue('exp_end_year', 'Present')
                                        } else {
                                            setValue('exp_end_year', '')
                                        }
                                    }}
                                />
                                Currently working here
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
                            onClick={()=> setIsExperienceEditClicked(false)}
                        >Cancel</button>

                    </div>
                </form>
            }

            <button onClick={()=>setIsExperienceEditClicked(true)} className={`bg-primary/50 text-white hidden p-1 rounded-md absolute duration-300 hover:bg-primary shadow-lg text-sm shadow-purple/20 hover:shadow-white/20 ${isExperienceEditClicked? "": "group-hover:inline-block group-hover:bottom-1 group-hover:right-8"}`}>
                <AiOutlineEdit />
            </button>
            <button onClick={()=>handleExperienceDelete(index)} className={`bg-primary/50 text-white hidden p-1 rounded-md absolute duration-300 hover:bg-primary shadow-lg text-sm shadow-purple/20 hover:shadow-white/20 ${isExperienceEditClicked? "": "group-hover:inline-block group-hover:bottom-1 group-hover:right-1"}`}>
                <AiOutlineDelete />
            </button>
        </div>
    );
};

export default AttorneyExperienceProfile;