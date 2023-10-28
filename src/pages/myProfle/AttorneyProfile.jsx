import useCurrentAttorney from '../../hooks/useCurrentAttorney';
import { BiCurrentLocation } from "react-icons/bi";
import { TbLicense } from "react-icons/tb";
import { GrStatusGoodSmall } from "react-icons/gr"
import { FiEdit } from "react-icons/fi"
import PageLoader from '../../components/PageLoader';
import useAuth from '../../hooks/useAuth';

const AttorneyProfile = () => {
    const {user, loading} = useAuth()
    if (loading) return <PageLoader />
    const [currentAttorneyData, attorneyLoading] = useCurrentAttorney();

    if (attorneyLoading) return <PageLoader />
    console.log(currentAttorneyData);

    const {_id, name, img, about, practiceArea, contact, location, hourly_rate, license, experience, education, awards} = currentAttorneyData
    return (
        <div className='container py-20'>
            <div className='relative group w-fit mx-auto md:flex gap-8 rounded p-5 bg-lightDark'>
                {/* Image and social Links */}
                <div className='min-w-max'>
                    {/* Image */}
                    <img
                        className="w-64 h-80 object-cover rounded mx-auto border border-primary"
                        src={img}
                        alt=""
                    />
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
                            <p className="text-2xl border-b pb-3 border-dark mb-5">Licensed for {license[0]?.licensed_for} years</p>

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
                    <div className="bg-primary/20 px-5 py-3 rounded-lg max-w-2xl">
                        <p>{about}</p>
                    </div>
                </div>
                <p className="bg-primary/50 text-white group-hover:inline-block hidden p-3 rounded-md absolute top-3 right-3 md:-right-16 group-hover:right-3 duration-300 hover:bg-primary shadow-xl shadow-purple/20 hover:shadow-white/20">
                    <FiEdit size="20px" />
                </p>
            </div>
        </div>
    );
};

export default AttorneyProfile;