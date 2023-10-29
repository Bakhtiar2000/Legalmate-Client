import React from 'react';
import { useForm } from 'react-hook-form';
import useCurrentClient from '../../hooks/useCurrentClient';

const ClientProfile = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [currentClientData, clientLoading, refetch] = useCurrentClient();
    
    return (
        <div className='container py-20'>
            <h2 className='text-center text-4xl text-green-500'>Work in Progress</h2>


        </div>
    );
};

export default ClientProfile;