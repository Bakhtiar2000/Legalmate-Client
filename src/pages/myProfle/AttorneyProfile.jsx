import useCurrentAttorney from '../../hooks/useCurrentAttorney';
import { BiCurrentLocation } from "react-icons/bi";
import { TbLicense } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr"
import { HiOutlineExternalLink } from "react-icons/hi";
import PageLoader from '../../components/PageLoader';
import useAuth from '../../hooks/useAuth';
import { BsCamera, BsCheckLg } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import CustomModal from '../../components/CustomModal';

const AttorneyProfile = () => {
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [currentAttorneyData, attorneyLoading, refetch] = useCurrentAttorney();

    // States
    const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
    const [isLicenseEditClicked, setIsLicenseEditClicked] = useState(false);
    const {user, loading} = useAuth()
    useEffect(() => {
        refetch()
    }, [user]);
   
    if (attorneyLoading || currentAttorneyData===null) return <PageLoader />

    const {_id, name, img, about, practiceArea, location, hourly_rate, license, experience, education, awards} = currentAttorneyData
    
    //Basic info Submit
    const onBasicInfoSubmit= data =>{
        console.log(data);
        //TODO: save the basic info data
        reset()
        setIsBasicInfoModalOpen(false)
    }
    const handleBasicInfoModal = (e) => {
        if (e == "cancel") setIsBasicInfoModalOpen(false)
    }

    //License submit 
    const onLicenseSubmit= data =>{
        console.log(data);
        //TODO: save the basic info data
        reset()
        setIsLicenseEditClicked(false)
    }

    //Education Submit
    const onEducationSubmit= data =>{
        console.log(data);
        //TODO: save the education data
        reset()
        setIsEducationModalOpen(false)
    }
    const handleEducationModal = (e) => {
        if (e == "cancel") setIsEducationModalOpen(false)
    }

    //Experience Submit
    const onExperienceSubmit= data =>{
        console.log(data);
        //TODO: save the experience data
        reset()
        setIsExperienceModalOpen(false)
    }
    const handleExperienceModal = (e) => {
        if (e == "cancel") setIsExperienceModalOpen(false)
    }

    //Award Submit
    const onAwardSubmit= data =>{
        console.log(data);
        //TODO: save the award data
        reset()
        setIsAwardModalOpen(false)
    }
    const handleAwardModal = (e) => {
        if (e == "cancel") setIsAwardModalOpen(false)
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
            {/* Basic Information */}
            <div className='w-fit mx-auto md:flex gap-8 rounded p-5 bg-lightDark'>
                {/* Image */}
               <div className='relative'>
                    <div className='min-w-max'>
                        {
                            img?
                            <img
                                className="w-48 md:w-64 h-60 md:h-80 object-cover rounded mx-auto border border-primary"
                                src={img}
                                alt={name}
                            />:
                            <img
                                className='w-48 md:w-64 h-60 md:h-80 object-cover rounded mx-auto border border-primary'
                                src="https://i.ibb.co/wNJtyRX/image-14.png" />
                        }
                    </div>
                    <label className='rounded-full border border-primary bg-lightDark/80 hover:bg-lightDark text-2xl p-[5px] z-20 cursor-pointer text-primary duration-300 absolute -bottom-4 left-[82%] md:left-[90%]'>

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
                        <form onSubmit={handleSubmit(onLicenseSubmit)} className="relative group bg-lightDark/50 rounded-lg px-5 py-3 md:ml-5 border border-dashed border-white h-fit w-fit">
                            <p className="text-2xl border-b pb-3 border-dark mb-5">Licensed for {license[0]?.licensed_for} {license[0]?.licensed_for && "years"}</p>

                            <div className="flex items-center gap-5 duration-300">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <BiCurrentLocation />
                                        <p>State:</p>
                                    </div>

                                    <div className={`flex items-center gap-2 ${isLicenseEditClicked && "my-2"}`}>
                                        <TbLicense />
                                        <p>Acquired:</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <GrStatusGoodSmall fill="green" />
                                        <p>Status:</p>
                                    </div>
                                </div>

                                {
                                    !isLicenseEditClicked?
                                    <div>
                                        <p>{license[0]?.state}</p>
                                        <p>{license[0]?.acquired_year}</p>
                                        <p className="text-green-500">{license[0]?.status}</p>
                                    </div>:

                                    <div className='max-w-[160px] text-black'>
                                        {/* license state */}
                                        <div className='w-full'>
                                            <input
                                                {...register("licenseState")}
                                                defaultValue={license[0]?.state}
                                                placeholder='License of State'
                                                className='w-full border border-dark/40 px-1 rounded-md focus:outline-none focus:border-primary mb-1'
                                            />
                                        </div>

                                        {/* license Acquired Year */}
                                        <div className='w-full'>
                                            <input
                                                type='number'
                                                {...register("licenseAcquiredYear")}
                                                defaultValue={license[0]?.acquired_year}
                                                placeholder='Year of Acquisition'
                                                className='w-full border border-dark/40 px-1 rounded-md focus:outline-none focus:border-primary mb-1'
                                            />
                                        </div>

                                        {/* license Status */}
                                        <div className='w-full'>
                                            <input
                                                {...register("licenseStatus")}
                                                defaultValue={license[0]?.status}
                                                placeholder='Active / Inactive'
                                                className='w-full border border-dark/40 px-1 rounded-md focus:outline-none focus:border-primary mb-1'
                                            />
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className='flex justify-end'>
                            {
                                !isLicenseEditClicked?
                                <p 
                                    onClick={()=> setIsLicenseEditClicked(true)} 
                                    className="mt-2 w-fit text-center px-2 bg-secondary hover:bg-secondary/60 duration-300 rounded text-white cursor-pointer"
                                >
                                    Update
                                </p>:
                                <div className='flex justify-end gap-2 items-center'>
                                    <p 
                                    onClick={()=> setIsLicenseEditClicked(false)} 
                                    className="mt-2 w-fit text-center px-2 bg-red-500 hover:bg-red-500/60 duration-300 rounded text-white cursor-pointer"
                                    >
                                        Cancel
                                    </p>
                                    <input
                                        type='submit' 
                                        value="Save" 
                                        className="mt-2 w-fit text-center px-2 bg-green-500 hover:bg-green-500/60 duration-300 rounded text-white cursor-pointer"
                                    />
                                </div>
                            }
                            </div>
                        </form>
                    </div>

                    {/* About */}
                    {
                        about && 
                        <div className="bg-primary/20 px-5 py-3 rounded-lg max-w-2xl">
                            <p>{about}</p>
                        </div>
                    }

                    {/* Edit details button */}
                    <p 
                        onClick={()=> setIsBasicInfoModalOpen(true)} 
                        className="mt-auto w-full text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white cursor-pointer"
                    >
                        Edit Details
                    </p>
                </div>
            </div>

            {/* Education */}
            <div className='p-5 rounded-lg bg-lightDark mt-10 max-w-5xl mx-auto'>
                <h2 className='text-3xl text-primary mb-1'>Education Details</h2>
                <p className='border-t border-primary'></p>

                {
                    education.length === 0?
                    <p className='text-center text-2xl mt-5'>☹ No education data found</p>:
                    <div className='flex flex-wrap gap-10'>
                        {
                            education.map(edu=> 
                            <div className='border border-white/40 rounded px-5 py-3'>
                                <p className='text-primary text-xl'>{edu?.institution}</p>
                                <p className=''>{edu?.subject}</p>
                                <p className='text-sm italic'>{edu?.start_year} - {edu?.end_year}</p>
                            </div>)
                        }
                    </div>
                }
                <div className='flex justify-center'>
                    <button onClick={()=> setIsEducationModalOpen(true)} className="text-center  text-blue-500 mt-5 cursor-pointer">➕ Add Education</button>
                </div>
            </div>

            {/* Experience */}
            <div className='p-5 rounded-lg bg-lightDark mt-10 max-w-5xl mx-auto'>
                <h2 className='text-3xl text-primary mb-1'>Experience Details</h2>
                <p className='border-t border-primary'></p>

                {
                    experience.length === 0?
                    <p className='text-center text-2xl mt-5'>☹ No Experience data found</p>:
                    <div className='flex flex-wrap gap-10'>
                        {
                            experience.map(exp=> 
                            <div className='border border-white/40 rounded px-5 py-3'>
                                <p className='text-primary text-xl'>{exp?.company}</p>
                                <p className=''>{exp?.position}</p>
                                <p className='text-sm italic'>{exp?.start_year} - {exp?.end_year}</p>
                            </div>)
                        }
                    </div>
                }
                <div className='flex justify-center'>
                    <button onClick={()=> setIsExperienceModalOpen(true)} className="text-center  text-blue-500 mt-5 cursor-pointer">➕ Add Experience</button>
                </div>
            </div>

            {/* Awards */}
            <div className='p-5 rounded-lg bg-lightDark mt-10 max-w-5xl mx-auto'>
                <h2 className='text-3xl text-primary mb-1'>Awards Details</h2>
                <p className='border-t border-primary'></p>

                {
                    awards.length === 0?
                    <p className='text-center text-2xl mt-5'>☹ No Awards data found</p>:
                    <div className='flex flex-wrap gap-10'>
                        {
                            awards.map(award=> 
                            <div className='border border-white/40 rounded px-5 py-3'>
                                 <p className='text-primary text-xl'>{award?.name}</p>
                                <p className=''>{award?.from}</p>
                                <p className='text-sm italic'>{award?.year}</p>
                            </div>)
                        }
                    </div>
                }
                <div className='flex justify-center'>
                    <button onClick={()=> setIsAwardModalOpen(true)} className="text-center  text-blue-500 mt-5 cursor-pointer">➕ Add Awards</button>
                </div>
            </div>

            {/* Basic Info Modal */}
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

                        <div className='sm:flex gap-5'>
                            {/* Name */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Name:</label>
                                <input
                                    {...register("name")}
                                    defaultValue={name}
                                    placeholder='Your full name'
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
                                />
                            </div>

                            {/* Practice Area */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Legal practice area:</label>
                                <input
                                    {...register("practiceArea")}
                                    placeholder='Your focused practice area'
                                    defaultValue={practiceArea}
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
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
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
                                />
                            </div>

                            {/* Hourly rate */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Hourly rate:</label>
                                <input
                                    {...register("hourlyRate")}
                                    defaultValue={hourly_rate}
                                    placeholder='Write within a range'
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
                                />
                            </div>
                        </div>                       

                        {/* About */}
                        <div className='w-full'>
                            <label className='text-dark text-sm'>About yourself:</label>
                            <textarea
                                {...register("about")}
                                defaultValue={about}
                                placeholder='Write about yourself within 250 words'
                                className='w-full h-32 border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-1 sm:mb-3'
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

            {/* Education Modal */}
            {
                isEducationModalOpen &&
                <CustomModal 
                    isModalOpen={isEducationModalOpen}
                    setIsModalOpen={setIsEducationModalOpen}
                    handleModal={handleEducationModal}
                >
                    <form className='text-black' onSubmit={handleSubmit(onEducationSubmit)}>
                        <h3 className="font-bold text-xl mb-2">Add Education Information</h3>
                        <p className='border-t border-dark mb-5'></p>
                            <div className='sm:flex gap-5'>
                                {/* Institution name */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Institution:</label>
                                    <input
                                        type='text'
                                        {...register("institution")}
                                        placeholder='e.g: University of British Columbia'
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>

                                 {/* Subject */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Subject:</label>
                                    <input
                                        type='text'
                                        {...register("subject")}
                                        placeholder='e.g: JD - Juris Doctor'
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>
                           </div>

                           <div className='sm:flex gap-5'>
                                {/* Start year */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Start year:</label>
                                    <input
                                        type='number'
                                        {...register("edu_start_year")}
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>

                                 {/* End year */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>End year:</label>
                                    <input
                                        type='number'
                                        {...register("edu_end_year")}
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>
                           </div>
                        <input 
                            className="text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5 cursor-pointer"
                            type="submit"
                            value="Save Changes"
                        />
                    </form>
                </CustomModal>
            }

            {/* Experience Modal */}
            {
                isExperienceModalOpen &&
                <CustomModal 
                    isModalOpen={isExperienceModalOpen}
                    setIsModalOpen={setIsExperienceModalOpen}
                    handleModal={handleExperienceModal}
                >
                    <form className='text-black' onSubmit={handleSubmit(onExperienceSubmit)}>
                        <h3 className="font-bold text-xl mb-2">Add Experience Information</h3>
                        <p className='border-t border-dark mb-5'></p>
                           <div className='sm:flex gap-5'>
                                {/* Company */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Company:</label>
                                    <input
                                        type='text'
                                        {...register("company")}
                                        placeholder='e.g: Pivotal Law Group'
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>

                                 {/* Position */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Position:</label>
                                    <input
                                        type='text'
                                        {...register("position")}
                                        placeholder='e.g: Attorney'
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>
                           </div>

                           <div className='sm:flex gap-5'>
                                {/* Start year */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>Start year:</label>
                                    <input
                                        type='number'
                                        {...register("exp_start_year")}
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>

                                 {/* End year */}
                                <div className='w-full'>
                                    <label className='text-dark text-sm'>End year:</label>
                                    <input
                                        type='number'
                                        {...register("exp_end_year")}
                                        className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                    />
                                </div>
                           </div>
                        <input 
                            className="text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5 cursor-pointer"
                            type="submit"
                            value="Save Changes"
                        />
                    </form>
                </CustomModal>
            }

            {/* Award Modal */}
            {
                isAwardModalOpen &&
                <CustomModal 
                    isModalOpen={isAwardModalOpen}
                    setIsModalOpen={setIsAwardModalOpen}
                    handleModal={handleAwardModal}
                >
                    <form className='text-black' onSubmit={handleSubmit(onAwardSubmit)}>
                        <h3 className="font-bold text-xl mb-2">Add Award Information</h3>
                        <p className='border-t border-dark mb-5'></p>
                            {/* Award name */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Award name:</label>
                                <input
                                    type='text'
                                    {...register("award_name")}
                                    placeholder='e.g: Rising Star'
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                />
                            </div>

                            {/* Given by */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Award Given by:</label>
                                <input
                                    type='text'
                                    {...register("position")}
                                    placeholder='e.g: Super Lawyers'
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                />
                            </div>


                            {/* year */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Year:</label>
                                <input
                                    type='number'
                                    placeholder='The year of winning award'
                                    {...register("exp_start_year")}
                                    className='w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3'
                                />
                            </div>
                        <input 
                            className="text-center px-3 md:px-5 py-1 md:py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white mt-5 cursor-pointer"
                            type="submit"
                            value="Save Changes"
                        />
                    </form>
                </CustomModal>
            }
        </div>
    );
};

export default AttorneyProfile;