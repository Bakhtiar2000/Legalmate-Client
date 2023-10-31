import React, { useState } from 'react';
import CustomModal from '../../components/CustomModal';
import { Link } from 'react-router-dom';

const AllCasesTableRow = ({index, singleCase, refetch}) => {
    const {_id, writer, writer_id, email, status, case_post, practice_area}= singleCase
    const [isCaseOpen, setIsCaseOpen] = useState(false)
    const handleCaseModal= e => {
        if (e == "cancel") setIsCaseOpen(false)
    }


    return (
        <tr className="border-b border-primary/20 hover:bg-primary/10 duration-300 text-center">
            <td>{index+1}</td>
            <td><Link to={`/client_details/${writer_id}`} className="hover:text-primary duration-300 hover:underline cursor-pointer">{writer}</Link></td>
            <td>{email}</td>

            <td><button onClick={()=> setIsCaseOpen(true)} className="mt-5 sm:mt-0 h-fit text-center px-3 py-1 bg-green-500 hover:bg-green-500/60 duration-300 rounded text-white cursor-pointer w-max">Show Post</button></td>

            <td>{practice_area}</td>

            <td>{status}</td>
            <td><button className='px-3 py-1 bg-secondary hover:bg-secondary/50 duration-300 rounded text-center'>Save</button></td>
            {
                isCaseOpen &&
                <CustomModal
                    isModalOpen={isCaseOpen}
                    setIsModalOpen={setIsCaseOpen}
                    handleModal={handleCaseModal}
                >
                    <h3 className="font-bold text-secondary text-xl mb-2">Case Post</h3>
                    <p className='border-t border-dark mb-3'></p>
                    <p className='text-black text-left md:text-lg'>{case_post}</p>
                </CustomModal>
            }
        </tr>
    );
};

export default AllCasesTableRow;