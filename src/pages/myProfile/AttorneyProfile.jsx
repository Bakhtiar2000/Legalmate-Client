import useCurrentAttorney from '../../hooks/useCurrentAttorney';
import { BiCurrentLocation } from "react-icons/bi";
import { TbLicense } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr"
import PageLoader from '../../components/PageLoader';
import useAuth from '../../hooks/useAuth';
import { BsCamera } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import CustomModal from '../../components/CustomModal';
import useAxiosSecure from '../../hooks/useAxios';
import AttorneyEducationProfile from './AttorneyEducationProfile';
import AttorneyExperienceProfile from './AttorneyExperienceProfile';
import AttorneyAwardProfile from './AttorneyAwardProfile';
import AttorneyDocumentProfile from './AttorneyDocumentProfile';

const AttorneyProfile = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
    const [currentAttorneyData, attorneyLoading, refetch] = useCurrentAttorney();
    // console.log(currentAttorneyData);

    // States
    const [isBasicInfoModalOpen, setIsBasicInfoModalOpen] = useState(false);
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
    const [isLicenseEditClicked, setIsLicenseEditClicked] = useState(false);
    const [present, setPresent] = useState(false);
    const { user, loading } = useAuth()
    useEffect(() => {
        refetch()
    }, [user]);

    if (attorneyLoading || currentAttorneyData === null) return <PageLoader />

    const { _id, email, name, img, about, practiceArea, location, hourly_rate, license, experience, education, awards, documents } = currentAttorneyData
    const newEducations = [...education, { subject: watch('subject'), institution: watch('institution'), start_year: watch('edu_start_year'), end_year: watch('edu_end_year') }];
    const newExperience = [...experience, { company: watch('company'), position: watch('position'), start_year: watch('exp_start_year'), end_year: watch('exp_end_year') }];
    const newAwards = [...awards, { name: watch('award_name'), from: watch('from'), year: watch('year') }];
    const newDocuments= [...documents,  watch('link')]


    //Validate end date
    const validateEndingDate = (endingDate, startingDate) => {
        if (endingDate && startingDate) {
            return endingDate >= startingDate || "Ending date must be greater than or equal to the starting date";
        }
        return true;
    };

    //Basic info Submit Complete
    const onBasicInfoSubmit = data => {
        const updateData = {
            email: email,
            name: data.name,
            practiceArea: data.practiceArea,
            location: data.location,
            hourlyRate: data.hourlyRate,
            about: data.about
        }
        console.log(updateData);
        axiosSecure.patch('/attorney/basic', updateData)
            .then(res => {
                if (res.status === 200) {
                    refetch();
                    setIsBasicInfoModalOpen(false)
                    // reset()
                }
            })
            .catch(error => {
                console.log(error);
            })


    }
    const handleBasicInfoModal = (e) => {
        if (e == "cancel") setIsBasicInfoModalOpen(false)
    }

    //License submit 
    const onLicenseSubmit = data => {

        const updateData = {
            email: email,
            license: {
                licenseState: data.licenseState,
                licenseAcquiredYear: data.licenseAcquiredYear,
                licenseStatus: data.licenseStatus
            }

        }
        console.log(updateData);
        axiosSecure.patch(`/attorney/license/`, updateData)
            .then(res => {
                if (res.status === 200) {
                    refetch()
                    setIsLicenseEditClicked(false)
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    //Education Submit complete
    const onDocumentSubmit = data => {
        const updateData = {
            email: email,
            newDocuments
        }
        console.log(updateData);
        // axiosSecure.patch('/attorney/document', updateData)
        //     .then(res => {
        //         if (res.status === 200) {
        //             refetch();
        //             reset()
        //             setIsDocumentEditClicked(false)
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }
    const handleDocumentModal = (e) => {
        if (e == "cancel") setIsDocumentModalOpen(false)
    }

    //Education Submit complete
    const onEducationSubmit = data => {
        const updateData = {
            email: email,
            newEducations
        }
        console.log(updateData);
        axiosSecure.patch('/attorney/education', updateData)
            .then(res => {
                if (res.status === 200) {
                    refetch();
                    reset()
                    setIsEducationModalOpen(false)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleEducationModal = (e) => {
        if (e == "cancel") setIsEducationModalOpen(false)
    }

    //Experience Submit Complete
    const onExperienceSubmit = data => {
        const updateData = {
            email: email,
            newExperience
        }
        console.log(updateData);
        axiosSecure.patch('/attorney/experience', updateData)
            .then(res => {
                if (res.status === 200) {
                    refetch();
                    reset()
                    setIsExperienceModalOpen(false)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleExperienceModal = (e) => {
        if (e == "cancel") setIsExperienceModalOpen(false)
    }

    //Award Submit
    const onAwardSubmit = data => {
        const updateData = {
            email: email,
            newAwards
        }
        console.log(updateData);
        axiosSecure.patch('/attorney/awards', updateData)
            .then(res => {
                if (res.status === 200) {
                    refetch();
                    reset()
                    setIsAwardModalOpen(false)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleAwardModal = (e) => {
        if (e == "cancel") setIsAwardModalOpen(false)
    }
    // Image Hosting
    const image_hosting_token = import.meta.env.VITE_Image_Upload_Token;
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const handlePictureUpload = event => {
        const picture = event.target.files
        const formData = new FormData()
        formData.append('image', picture)
        console.log(picture)
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
                            console.log(res.data)
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
                <div className='relative h-fit w-fit'>
                    <div className='min-w-max'>
                        {
                            img ?
                                <img
                                    className="w-48 md:w-64 h-60 md:h-80 object-cover rounded mx-auto border border-primary"
                                    src={img}
                                    alt={name}
                                /> :
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
                        <form onSubmit={handleSubmit(onLicenseSubmit)} className="relative group bg-lightDark/50 rounded-lg px-5 py-3 md:ml-5 mt-5 md:mt-0 border border-dashed border-white h-fit w-fit">
                            <p className="text-2xl border-b pb-3 border-dark mb-5">Licensed for {license?.licensed_for} {license?.licensed_for && "years"}</p>

                            <div className="flex items-center gap-5 duration-300">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <BiCurrentLocation />
                                        <p>State:{license.licenseState}</p>
                                    </div>

                                    <div className={`flex items-center gap-2 ${isLicenseEditClicked && "my-2"}`}>
                                        <TbLicense />
                                        <p>Acquired:{license.licenseAcquiredYear}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <GrStatusGoodSmall fill="green" />
                                        <p>Status:{license.licenseStatus}</p>
                                    </div>
                                </div>

                                {
                                    !isLicenseEditClicked ?
                                        <div>
                                            <p>{license?.state}</p>
                                            <p>{license?.acquired_year}</p>
                                            <p className="text-green-500">{license?.status}</p>
                                        </div> :

                                        <div className='max-w-[160px] text-black'>
                                            {/* license state */}
                                            <div className='w-full'>
                                                <input
                                                    {...register("licenseState")}
                                                    defaultValue={license.licenseState}
                                                    placeholder='License of State'
                                                    className='w-full border border-dark/40 px-1 rounded-md focus:outline-none focus:border-primary mb-1'
                                                />
                                            </div>

                                            {/* license Acquired Year */}
                                            <div className='w-full'>
                                                <input
                                                    type='number'
                                                    {...register("licenseAcquiredYear")}
                                                    defaultValue={license.licenseAcquiredYear}
                                                    placeholder='Year of Acquisition'
                                                    className='w-full border border-dark/40 px-1 rounded-md focus:outline-none focus:border-primary mb-1'
                                                />
                                            </div>

                                            {/* license Status */}
                                            <div className='w-full'>
                                                <input
                                                    {...register("licenseStatus")}
                                                    defaultValue={license.licenseStatus}
                                                    placeholder='Active / Inactive'
                                                    className='w-full border border-dark/40 px-1 rounded-md focus:outline-none focus:border-primary mb-1'
                                                />
                                            </div>
                                        </div>
                                }
                            </div>

                            <div className='flex justify-end'>
                                {
                                    !isLicenseEditClicked ?
                                        <p
                                            onClick={() => setIsLicenseEditClicked(true)}
                                            className="mt-2 w-fit text-center px-2 bg-secondary hover:bg-secondary/60 duration-300 rounded text-white cursor-pointer"
                                        >
                                            Update
                                        </p> :
                                        <div className='flex justify-end gap-2 items-center'>
                                            <p
                                                onClick={() => setIsLicenseEditClicked(false)}
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
                        onClick={() => setIsBasicInfoModalOpen(true)}
                        className="mt-auto w-full text-center px-5 py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white cursor-pointer"
                    >
                        Edit Details
                    </p>
                </div>
            </div>

            {/* Legal Documents */}
            <div className='p-5 rounded-lg bg-lightDark mt-10 max-w-5xl mx-auto'>
                <h2 className='text-3xl text-primary mb-1'>Legal documents</h2>
                <p className='border-t border-primary'></p>
                <p className='text-sm mt-2'>N.B. You need to Provide appropriate documents to get access of messaging in our website</p>
                {
                    documents.length === 0 ?
                        <p className='text-center text-2xl mt-5'>☹ No documents data found</p> :
                        <div className='grid lg:grid-cols-2 gap-6 mt-5'>
                            {
                                documents.map((doc, index) =><AttorneyDocumentProfile
                                    key={index}
                                    doc={doc}
                                    index={index}
                                ></AttorneyDocumentProfile>)
                            }
                        </div>
                }
                <div className='flex justify-center'>
                    <button onClick={() => setIsDocumentModalOpen(true)} className="text-center  text-blue-500 mt-5 cursor-pointer">➕ Add Documents</button>
                </div>
            </div>

            {/* Education */}
            <div className='p-5 rounded-lg bg-lightDark mt-10 max-w-5xl mx-auto'>
                <h2 className='text-3xl text-primary mb-1'>Education Details</h2>
                <p className='border-t border-primary'></p>

                {
                    education.length === 0 ?
                        <p className='text-center text-2xl mt-5'>☹ No education data found</p> :
                        <div className='grid lg:grid-cols-2 gap-6 mt-5'>
                            {
                                education.map((edu, index) => <AttorneyEducationProfile
                                    key={index}
                                    edu={edu}
                                    id={_id}
                                    refetch={refetch}
                                    index={index}
                                ></AttorneyEducationProfile>)
                            }
                        </div>
                }
                <div className='flex justify-center'>
                    <button onClick={() => setIsEducationModalOpen(true)} className="text-center  text-blue-500 mt-5 cursor-pointer">➕ Add Education</button>
                </div>
            </div>

            {/* Experience */}
            <div className='p-5 rounded-lg bg-lightDark mt-10 max-w-5xl mx-auto'>
                <h2 className='text-3xl text-primary mb-1'>Experience Details</h2>
                <p className='border-t border-primary'></p>

                {
                    experience.length === 0 ?
                        <p className='text-center text-2xl mt-5'>☹ No Experience data found</p> :
                        <div className='grid lg:grid-cols-2 gap-6 mt-5'>
                            {
                                experience.map((exp, index) => <AttorneyExperienceProfile
                                    key={index}
                                    exp={exp}
                                    index={index}
                                    id={_id}
                                    refetch={refetch}
                                ></AttorneyExperienceProfile>)
                            }
                        </div>
                }
                <div className='flex justify-center'>
                    <button onClick={() => setIsExperienceModalOpen(true)} className="text-center  text-blue-500 mt-5 cursor-pointer">➕ Add Experience</button>
                </div>
            </div>

            {/* Awards */}
            <div className='p-5 rounded-lg bg-lightDark mt-10 max-w-5xl mx-auto'>
                <h2 className='text-3xl text-primary mb-1'>Awards Details</h2>
                <p className='border-t border-primary'></p>

                {
                    awards.length === 0 ?
                        <p className='text-center text-2xl mt-5'>☹ No Awards data found</p> :
                        <div className='grid lg:grid-cols-2 gap-6 mt-5'>
                            {
                                awards.map((award, index) => <AttorneyAwardProfile
                                    key={index}
                                    award={award}
                                    id={_id}
                                    refetch={refetch}
                                    index={index}
                                ></AttorneyAwardProfile>)
                            }
                        </div>
                }
                <div className='flex justify-center'>
                    <button onClick={() => setIsAwardModalOpen(true)} className="text-center  text-blue-500 mt-5 cursor-pointer">➕ Add Awards</button>
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
                                    placeholder='e.g. Dhaka, Bangladesh'
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
                                placeholder='Write about your professional life within 250 words'
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

            {/* Document Modal */}
            {
                isDocumentModalOpen &&
                <CustomModal
                    isModalOpen={isDocumentModalOpen}
                    setIsModalOpen={setIsDocumentModalOpen}
                    handleModal={handleDocumentModal}
                >
                    <form className='text-black' onSubmit={handleSubmit(onDocumentSubmit)}>
                        <h3 className="font-bold text-xl mb-2">Add Document Information</h3>
                        <p className='border-t border-dark mb-5'></p>
                        {/* Document name */}
                        <div className='w-full'>
                            <label className='text-dark text-sm'>Document's Drive Link:</label>
                            <input
                                type='text'
                                {...register("link", {required: true})}
                                placeholder='Provide the drive link of Attorney documents'
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.link && 'border-2 border-red-500'}`}
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
                                    {...register("institution", { required: true })}
                                    placeholder='e.g: University of British Columbia'
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.institution && 'border-2 border-red-500'}`}
                                />
                            </div>

                            {/* Subject */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Subject:</label>
                                <input
                                    type='text'
                                    {...register("subject", { required: true })}
                                    placeholder='e.g: JD - Juris Doctor'
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.subject && 'border-2 border-red-500'}`}
                                />
                            </div>
                        </div>

                        <div className='sm:flex gap-5'>
                            {/* Start year */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Start year:</label>
                                <input
                                    type='number'
                                    {...register("edu_start_year", { required: true })}
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.edu_start_year && 'border-2 border-red-500'}`}
                                />
                            </div>

                            {/* End year */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>End year:</label>
                                {
                                    present ?
                                        <input
                                            value='Present'
                                            readOnly
                                            {...register("edu_end_year", { required: true })}
                                            className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.edu_end_year && 'border-2 border-red-500'}`}
                                        /> :
                                        <>
                                            <input
                                                type='number'
                                                {...register("edu_end_year", { required: true, validate: (value) => validateEndingDate(value, watch("edu_start_year")) })}
                                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors?.edu_end_year?.type === "required" && 'border-2 border-red-500'}`}
                                            />
                                            {errors?.edu_end_year?.type === 'validate' && <span className='text-red-500 text-sm duration-300'>Invalid End year</span>}
                                        </>
                                }

                                {/* Checkbox for present */}
                                <label className='flex gap-2 justify-end text-base'>
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
                                    {...register("company", { required: true })}
                                    placeholder='e.g: Pivotal Law Group'
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.company && 'border-2 border-red-500'}`}
                                />
                            </div>

                            {/* Position */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Position:</label>
                                <input
                                    type='text'
                                    {...register("position", { required: true })}
                                    placeholder='e.g: Attorney'
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.position && 'border-2 border-red-500'}`}
                                />
                            </div>
                        </div>

                        <div className='sm:flex gap-5'>
                            {/* Start year */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>Start year:</label>
                                <input
                                    type='number'
                                    {...register("exp_start_year", { required: true })}
                                    className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.exp_start_year && 'border-2 border-red-500'}`}
                                />
                            </div>

                            {/* End year */}
                            <div className='w-full'>
                                <label className='text-dark text-sm'>End year:</label>
                                {
                                    present ?
                                        <input
                                            value='Present'
                                            readOnly
                                            {...register("exp_end_year", { required: true })}
                                            className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.exp_end_year && 'border-2 border-red-500'}`}
                                        /> :
                                        <>
                                            <input
                                                type='number'
                                                {...register("exp_end_year", { required: true, validate: (value) => validateEndingDate(value, watch("exp_start_year")) })}
                                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors?.exp_end_year?.type === "required" && 'border-2 border-red-500'}`}
                                            />
                                            {errors?.exp_end_year?.type === 'validate' && <span className='text-red-500 text-sm duration-300'>Invalid End year</span>}
                                        </>
                                }

                                {/* Checkbox for present */}
                                <label className='flex gap-2 justify-end text-base'>
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
                                {...register("award_name", { required: true })}
                                placeholder='e.g: Rising Star'
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.award_name && 'border-2 border-red-500'}`}
                            />
                        </div>

                        {/* Given by */}
                        <div className='w-full'>
                            <label className='text-dark text-sm'>Award Given by:</label>
                            <input
                                type='text'
                                {...register("from", { required: true })}
                                placeholder='e.g: Super Lawyers'
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.from && 'border-2 border-red-500'}`}
                            />
                        </div>


                        {/* year */}
                        <div className='w-full'>
                            <label className='text-dark text-sm'>Year:</label>
                            <input
                                type='number'
                                placeholder='The year of winning award'
                                {...register("year", { required: true })}
                                className={`w-full border border-dark/40 p-2 rounded-md focus:outline-none focus:border-primary mb-3 ${errors.year && 'border-2 border-red-500'}`}
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