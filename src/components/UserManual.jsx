import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import CustomModal from './CustomModal';

const UserManual = () => {
    const { user, currentUser, loading } = useAuth();
    const location = useLocation()
    //Use manual states and functions
    const [isClientManualOpen, setIsClientManualOpen] = useState(false);
    const [isAttorneyManualOpen, setIsAttorneyManualOpen] = useState(false);
    const handleClientManualModal = (e) => {
        if (e == "cancel") setIsClientManualOpen(false)
    }
    const handleAttorneyManualModal = (e) => {
        if (e == "cancel") setIsClientManualOpen(false)
    }

    useEffect(() => {
        const from = location.state?.from?.pathname;
        if (from == "/register") {
            setIsClientManualOpen(true);
        }
    }, [loading]);

    return (
        <>
            {
                isClientManualOpen &&
                <CustomModal
                    isModalOpen={isClientManualOpen}
                    setIsModalOpen={setIsClientManualOpen}
                    handleModal={handleClientManualModal}

                >
                    {/* Modal Heading */}
                    <div className="overflow-y-hidden text-black">
                        <div className="pt-2 pb-2 flex flex-col gap-1 border-b border-dark/20 text-green -mt-3">
                            <h3 className="text-3xl">👋 Welcome {user?.displayName}</h3>
                        </div>

                        {/* Modal content */}
                        <p className="mt-3 mb-5">We're thrilled to have you join our platform, connecting you with top-notch attorneys from across the country. Your journey towards legal solutions just got easier. Whether you have questions, need advice, or are seeking representation, our network of experienced lawyers is here to assist you. With our secure and convenient chat platform, you can confidently explore your legal options, knowing that you have expert guidance at your fingertips. Thank you for choosing us to be your trusted legal partner.</p>

                        <h3 className='font-semibold text-xl mb-1'>✅ Complete your profile!</h3>
                        <p className='mb-5'>To improve your visibility throughout our website, we recommend completing your profile. This helps attorneys understand you better</p>

                        <Link to="/myProfile"><button className='text-center px-4 py-2 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white'>Edit Profile</button></Link>
                    </div>
                </CustomModal>
            }

        </>
    );
};

export default UserManual;