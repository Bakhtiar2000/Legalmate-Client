import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc"
import { MdOutlineHistory } from "react-icons/md"

const Profile = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='relative z-[999] group'>
            {/* Profile Picture */}
            {
                user?.photoURL ? 
                <Link className='w-10 h-10' to="/"><img className="h-10 w-10 rounded-full object-cover shadow-lg group-hover:shadow-blue duration-300 drop-shadow-xl cursor-pointer" src={user?.photoURL} alt={user?.displayName} /></Link> :
                <p className="h-12 w-12 bg-primary text-dark text-xl flex items-center justify-center font-bold rounded-full uppercase shadow-lg group-hover:shadow-blue duration-300 drop-shadow-xl cursor-pointer">{user?.displayName?.slice(0, 2)}</p>
            }
            {/* Dropdown */}
            <div
                className="absolute right-0 top-28 max-w-xs min-w-[200px] bg-white shadow-4xl rounded-lg border-b-4 border-purple shadow-gray/40 origin-top-right transition-all duration-300 ease-in-out group-hover:top-[60px] overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100">

                <ul
                    className="flex flex-col text-dark"
                >
                    <li>
                        <Link to='/myProfile' className='text-purple flex items-center gap-4 hover:gap-5 hover:bg-purple/20 py-2 pl-4 hover:underline duration-300'><VscAccount /> My Profile</Link>
                    </li>
                    <li>
                        <Link to='/paymentHistory' className='text-purple flex items-center gap-4 hover:gap-5 hover:bg-purple/20 py-2 pl-4 hover:underline duration-300'><MdOutlineHistory /> Payment History</Link>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Profile;