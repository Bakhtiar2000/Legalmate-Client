import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FaRegClock } from "react-icons/fa6";

const Awareness = () => {
    const [ awarenessData, setAwarenessData ]= useState([])
    useEffect(()=> {
        fetch('/awareness.json')
        .then(res=> res.json())
        .then(data => {
            setAwarenessData(data);
            console.log(data);
        })
    }, [])

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
                            className='rounded-lg p-5 border border-primary/20 w-96 md:w-[480px] mx-auto shadow hover:shadow-primary duration-300'
                            >
                                {/* <div className='flex justify-center mb-6'>
                                    <iframe width="560" height="315" src={awareness?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div> */}

                                <img className='w-full rounded' src={awareness?.thumbnail} alt="" />
                                <div className='flex gap-5 justify-between mt-2'>
                                    <p className='text-blue-500 hover:underline cursor-pointer'>{awareness?.practiceArea}</p>
                                    <p className='flex justify-center gap-2 items-center text-sm'><FaRegClock /> {awareness?.read_time} min read</p>
                                </div>
                                <p className='text-xl md:text-2xl text-primary mt-2'>{awareness?.title}</p>
                                <p className='line-clamp-3 mt-2'>{awareness?.blog}</p>
                                
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Awareness;