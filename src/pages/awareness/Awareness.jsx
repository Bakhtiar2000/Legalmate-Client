import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

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
                            className='rounded-lg p-5 border border-primary/50 w-96 md:w-[480px] mx-auto shadow-lg shadow-white'
                            >
                                {/* <div className='flex justify-center mb-6'>
                                    <iframe width="560" height="315" src={awareness?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div> */}

                                <img className='w-full rounded' src={awareness?.thumbnail} alt="" />

                                <p className='text-2xl text-primary'>{awareness?.title}</p>
                                <p>{awareness?.practiceArea}</p>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Awareness;