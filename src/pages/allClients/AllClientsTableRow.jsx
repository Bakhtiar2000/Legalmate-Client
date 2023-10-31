import React from 'react';
import { Link } from 'react-router-dom';

const AllClientsTableRow = ({ index, client, refetch }) => {
    const {name, img, email, location, _id, occupation}= client

    return (
        <>
            <tr className="border-b border-primary/20 hover:bg-primary/10 duration-300 text-center">
                <td>{index+1}</td>
                <td>
                    {
                        img?
                        <img className='w-10 h-10 rounded-full object-cover object-center mx-auto' src={img} alt={name} />:
                        <p className='w-10 h-10 bg-primary text-dark text-xl flex items-center justify-center font-bold rounded-full uppercase shadow-lg mx-auto'>{name.slice(0,2)}</p>
                    }
                </td>
                <td><Link to={`/client_details/${_id}`} className="hover:text-primary duration-300 hover:underline cursor-pointer">{name}</Link></td>
                <td>{email}</td>
                <td>status</td>
                <td><button className='px-3 py-1 bg-secondary hover:bg-secondary/50 duration-300 rounded text-center'>Save</button></td>
            </tr>
        </>
    );
};

export default AllClientsTableRow;