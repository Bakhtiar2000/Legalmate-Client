import useCurrentAttorney from '../../hooks/useCurrentAttorney';
import { BiCurrentLocation } from "react-icons/bi";
import { TbLicense } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr"
import { FiEdit } from "react-icons/fi"
import PageLoader from '../../components/PageLoader';
import useAuth from '../../hooks/useAuth';
import { BsCamera, BsCheckLg } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import CustomModal from '../../components/CustomModal';

const AttorneyProfile = () => {
    const {user, loading} = useAuth()
    if (loading) return <PageLoader />
    const [currentAttorneyData, attorneyLoading, refetch] = useCurrentAttorney();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    if (attorneyLoading) return <PageLoader />

    const {_id, name, img, about, practiceArea, location, hourly_rate, license, experience, education, awards} = currentAttorneyData
    
    const onSubmit= data =>{
        console.log(data.data);
    }

    const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
    const handleBasicInfoModal = (e) => {
        console.log(e);
        if (e == "cancel") setIsBasicInfoModalOpen(false)
        else if (e== "save") {
            //Todo: Update basic information
            setIsBasicInfoModalOpen(false)
        }
    }
    // Image Hosting
    const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const handlePictureUpload = event => {
        const picture = event.target.files[0]
        const formData = new FormData()
        formData.append('image', picture)

        fetch(image_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {
                    const image = imageResponse.data.display_url
                    const profile = {
                        url: image,
                        email: email
                    }

                    axiosSecure.patch(`/attorney/profilePhoto/${_id}`, profile)
                        .then(res => {
                            if (res.status === 200) {
                                refetch()
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
    }
    return (
        <div className='container py-20'>
            <div className='relative group w-fit mx-auto md:flex gap-8 rounded p-5 bg-lightDark'>
                {/* Image */}
               <div className='relative'>
                    <div className='min-w-max'>
                        {
                            img?
                            <img
                                className="w-64 h-80 object-cover rounded mx-auto border border-primary"
                                src={img}
                                alt={name}
                            />:
                            <img
                                className='w-64 h-80 object-cover rounded mx-auto border border-primary'
                                src="https://i.ibb.co/wNJtyRX/image-14.png" />
                        }
                    </div>
                    <label className='rounded-full border border-primary bg-lightDark/80 hover:bg-lightDark text-2xl p-[5px] z-20 cursor-pointer text-primary duration-300 absolute -bottom-4 left-[90%]'>

                        <input
                            name='picture'
                            type='file'
                            style={{ display: 'none' }}
                            onChange={handlePictureUpload}
                        />
                        <BsCamera />
                    </label>
               </div>

                <div className="flex flex-col gap-8">
                    {/* Basic info and license */}
                    <div className="md:flex justify-between gap-8 mt-5 md:mt-0">

                        {/* Name, practice area, location, rating */}
                        <div>
                            <p className='text-4xl'>{name}</p>
                            <p className="lg:text-xl md:mt-2">{practiceArea} attorney at {location}</p>
                            <p className="lg:text-xl md:mt-2">Hourly rate: <span className="text-orange-500">{hourly_rate}</span></p>

                        </div>

                        {/* License information */}
                        <div className="bg-lightDark/50 rounded-lg p-3 md:ml-5 border border-dashed border-white h-fit w-fit">
                            <p className="text-2xl border-b pb-3 border-dark mb-5">Licensed for {license[0]?.licensed_for} {license[0]?.licensed_for && "years"}</p>

                            <div className="flex items-center gap-5">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <BiCurrentLocation />
                                        <p>State:</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <TbLicense />
                                        <p>Acquired:</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <GrStatusGoodSmall fill="green" />
                                        <p>Status:</p>
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
                    {
                        about && 
                        <div className="bg-primary/20 px-5 py-3 rounded-lg max-w-2xl">
                            <p>{about}</p>
                        </div>
                    }
                </div>
                <p onClick={()=> setIsBasicInfoModalOpen(true)} className="bg-primary/50 text-white group-hover:inline-block hidden p-3 rounded-md absolute top-3 right-3 md:-right-16 group-hover:right-3 duration-300 hover:bg-primary shadow-xl shadow-purple/20 hover:shadow-white/20 cursor-pointer">
                    Edit Details
                </p>
            </div>

            {
                isBasicInfoModalOpen &&
                <CustomModal 
                    isModalOpen={isBasicInfoModalOpen}
                    setIsModalOpen={setIsBasicInfoModalOpen}
                    handleModal={handleBasicInfoModal}
                >
                    <form className='text-black' onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="font-bold text-xl mb-2">Update Your Basic Profile Information</h3>
                        <p className='border-t border-dark mb-5'></p>

                        <div className='sm:flex gap-5'>
                            {/* Name */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Name:</label>
                                <input
                                    {...register("name")}
                                    defaultValue={name}
                                    placeholder='Your full name'
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                />
                            </div>

                            {/* Practice Area */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Legal practice area:</label>
                                <input
                                    {...register("practiceArea")}
                                    placeholder='Your focused practice area'
                                    defaultValue={practiceArea}
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                />
                            </div>
                        </div>

                        <div className='sm:flex gap-5'>
                            {/* Location */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Location:</label>
                                <input
                                    {...register("location")}
                                    defaultValue={location}
                                    placeholder='Your Location'
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                />
                            </div>

                            {/* Hourly rate */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Hourly rate:</label>
                                <input
                                    {...register("hourlyRate")}
                                    defaultValue={hourly_rate}
                                    placeholder='Write within a range'
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                />
                            </div>
                        </div>
                    
                        {/* License */}
                        <div className=' border bg-primary/20 border-primary px-3 pt-2 rounded-lg my-2'>
                            <p className='text-xl font-semibold mb-1 text-secondary'>License Information</p>
                            <div className='sm:flex gap-3'>
                                {/* license state */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>State:</label>
                                    <input
                                        {...register("licenseState")}
                                        defaultValue={license?.state}
                                        placeholder='License of State'
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>

                                {/* license Acquired Year */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Acquisition year:</label>
                                    <input
                                        type='number'
                                        {...register("licenseAcquiredYear")}
                                        defaultValue={license?.acquired_year}
                                        placeholder='Year of Acquisition'
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>

                                {/* license Status */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Status:</label>
                                    <input
                                        {...register("licenseStatus")}
                                        defaultValue={license?.status}
                                        placeholder='Active / Inactive'
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>

                            </div>
                        </div>

                        {/* About */}
                        <div className='w-full'>
                            <label className='text-dark text-sm'>About yourself:</label>
                            <textarea
                                {...register("about")}
                                defaultValue={about}
                                placeholder='Write about yourself within 250 words'
                                className='w-full h-32 border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                            />
                        </div>

                        <input 
                            className="flex flex-end text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5"
                            type="submit"
                            onClick={()=> handleBasicInfoModal("save")}
                        />
                    </form>
                </CustomModal>
            }
        </div>
    );
};

export default AttorneyProfile;