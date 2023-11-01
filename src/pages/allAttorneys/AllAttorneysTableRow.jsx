import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';

const AllAttorneysTableRow = ({index, attorney, refetch}) => {
    const {_id, name, img, email, documents}= attorney
    console.log(img);
    const [isDocumentOpen, setIsDocumentOpen] = useState(false)
    const handleDocumentModal= e => {
        if (e == "cancel") setIsDocumentOpen(false)
    }

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
                <td><Link to={`/attorney_details/${_id}`} className="hover:text-primary duration-300 hover:underline cursor-pointer">{name}</Link></td>
                <td>{email}</td>
                <td><button onClick={()=> setIsDocumentOpen(true)} className="mt-5 sm:mt-0 h-fit text-center px-3 py-1 bg-green-500 hover:bg-green-500/60 duration-300 rounded text-white cursor-pointer w-max">Show Links</button></td>
                <td>status</td>
                <td><button className='px-3 py-1 bg-secondary hover:bg-secondary/50 duration-300 rounded text-center'>Save</button></td>
                {
                isDocumentOpen &&
                <CustomModal
                    isModalOpen={isDocumentOpen}
                    setIsModalOpen={setIsDocumentOpen}
                    handleModal={handleDocumentModal}
                >
                    <h3 className="font-bold text-secondary text-xl mb-2">Legal Documents</h3>
                    <p className='border-t border-dark mb-3'></p>
                    {
                        documents.map((document, index) =>
                            <div className='flex items-center gap-2'>
                                <p>{index+1}</p>
                                <a href={document} target='_blank' className='text-black text-left md:text-lg'>{document}</a>
                            </div>
                        ) 
                    }
                </CustomModal>
                }
             </tr>
        </>
    );
};

export default AllAttorneysTableRow;