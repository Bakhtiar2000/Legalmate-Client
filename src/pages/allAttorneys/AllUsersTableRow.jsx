import React from 'react';

const AllUsersTableRow = ({index, user, refetch}) => {
    const {name, img, email, status}= user
    console.log(img);

    return (
        <>
             <tr className="border-b border-green/20 hover:bg-green/10 duration-300 group text-center">
                <td>{index}</td>
                <td>
                    {
                        img?
                        <img className='w-10 h-10 rounded-full object-cover object-center' src={img} alt={name} />:
                        <p className='w-10 h-10 rounded-full text-xl font-bold text-center m-auto bg-primary p-1 uppercase'>{name.slice(0,2)}</p>
                    }
                </td>
                <td>{name}</td>
                <td>{email}</td>
                {/* <td>{status}</td> */}
                {/* <td><button>Save</button></td> */}
             </tr>
        </>
    );
};

export default AllUsersTableRow;