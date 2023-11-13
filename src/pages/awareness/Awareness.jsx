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
                            className='rounded-lg p-5 border border-primary/50 w-fit mx-auto'
                            >
                                <div className='flex justify-center mb-6'>
                                    <iframe width="560" height="315" src={awareness?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div>

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