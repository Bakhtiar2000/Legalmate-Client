import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FaRegClock } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import useAwareness from '../../hooks/useAwareness';
import { HiOutlineExternalLink } from 'react-icons/hi';

const Awareness = () => {
    const [ awarenessData ]= useAwareness()
    console.log(awarenessData);

    return (
        <div>
             <Helmet>
                <title>Awareness - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Awareness" />
 
            <div className='container py-20'>
            <div className='grid lg:grid-cols-2 gap-5'>
                    {
                        awarenessData.map(awareness=> <div 
                            key={awareness?._id} 
                            className='relative group rounded-lg p-5 border border-primary/20 w-96 md:w-[480px] mx-auto shadow hover:shadow-primary duration-300'
                            >
                                <img className='w-full rounded' src={awareness?.thumbnail} alt="" />
                                <div className='flex gap-5 justify-between mt-2'>
                                    <p className='text-blue-500'>{awareness?.practiceArea}</p>
                                    <p className='flex justify-center gap-2 items-center text-sm'><FaRegClock /> {awareness?.read_time} min read</p>
                                </div>
                                <Link to={`/awarenessDetails/${awareness?._id}`} className='text-xl md:text-2xl text-primary hover:underline mt-2'>{awareness?.title}</Link>
                                <p className='line-clamp-3 mt-2'>{awareness?.blog}</p>

                                <Link to={`/awarenessDetails/${awareness?._id}`} className="bg-primary/50 text-white group-hover:inline-block hidden p-3 rounded-md absolute top-3 right-3 md:-right-16 group-hover:right-3 duration-300 hover:bg-primary shadow-xl shadow-purple/20 hover:shadow-white/20">
                                    <HiOutlineExternalLink size="20px" />
                                </Link>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Awareness;