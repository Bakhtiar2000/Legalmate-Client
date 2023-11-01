import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { VscAccount, VscLaw } from "react-icons/vsc"
import { BsFileEarmarkMedical } from "react-icons/bs"
import { MdOutlineHistory, MdOutlineContactMail } from "react-icons/md"

const Profile = () => {
    const { currentUser, user } = useContext(AuthContext)
    // console.log(user, currentUser);
    return (
        <div className='relative z-[999] group'>
            {/* Profile Picture */}
            {
                currentUser?.image ? 
                <div className='w-10 h-10'><img className="h-10 w-10 rounded-full object-cover shadow-lg duration-300 drop-shadow-xl cursor-pointer bg-white" src={currentUser?.image} alt={currentUser?.name} /></div> :
                <p className="h-12 w-12 bg-primary text-dark text-xl flex items-center justify-center font-bold rounded-full uppercase shadow-lg duration-300 drop-shadow-xl cursor-pointer">{currentUser?.name?.slice(0, 2)}</p>
            }
            {/* Dropdown */}
            <div
                className="absolute right-0 top-28 max-w-xs min-w-[200px] bg-white shadow-4xl rounded-lg border-b-4 border-dark shadow-gray/40 origin-top-right transition-all duration-300 ease-in-out group-hover:top-[60px] overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100">

                <ul className="flex flex-col text-dark">
                {
                currentUser.role== "attorney" ?
                <>
                    {/* Attorney Profile Menu */}
                    <li><Link to='/myProfile' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><VscAccount /> My Profile</Link> </li>
                    <li> <Link to='/paymentHistory' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><MdOutlineHistory /> Payment History</Link></li>
                    <li><Link to='/aboutUs' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><VscLaw /> About Us</Link></li>
                    <li><Link to='/contact' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><MdOutlineContactMail /> Contact</Link></li>
                </>:
                <>
                    {/* Client Profile Menu */}
                    <li><Link to='/myProfile' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><VscAccount /> My Profile</Link></li>
                    <li><Link to='/myCases' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><BsFileEarmarkMedical /> My Cases</Link></li>
                    <li> <Link to='/paymentHistory' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><MdOutlineHistory /> Payment History</Link></li>
                    <li><Link to='/aboutUs' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><VscLaw /> About Us</Link></li>
                    <li><Link to='/contact' className='text-dark flex items-center gap-4 hover:gap-5 hover:bg-dark/20 py-2 pl-4 hover:underline duration-300'><MdOutlineContactMail /> Contact</Link></li>
                </>
                }
                </ul>
            </div>
        </div>
    );
};

export default Profile;