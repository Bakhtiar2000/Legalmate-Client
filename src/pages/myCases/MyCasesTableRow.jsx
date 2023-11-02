import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import CustomModal from '../../components/CustomModal';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxios';

const MyCasesTableRow = ({ index, singleCase, refetch }) => {

    const [axiosSecure] = useAxiosSecure();
    const { _id, case_post, practice_area } = singleCase;
    const [isCaseOpen, setIsCaseOpen] = useState(false);

    const handleCaseModal = e => {
        if (e == "cancel") setIsCaseOpen(false)
    }

    const handleCaseDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('delete', _id)

                axiosSecure
                    .delete(`/case/delete/${_id}`)
                    .then((res) => {
                        if (res.status == 200) {
                            refetch()
                            Swal.fire({
                                icon: "success",
                                title: "Delete Successfully!",
                                showConfirmButton: false,
                                timer: 1500,
                            });

                        }
                    })
                    .catch((err) => console.log(err));

            }
        });
    }

    const handleCaseUpdate = () => {
    //    setIsCaseOpen(!isCaseOpen)
    }

    return (
        <tr className="border-b border-primary/20 hover:bg-primary/10 duration-300 text-center">
            <td>{index + 1}</td>

            <td><button onClick={() => setIsCaseOpen(true)} className="mt-5 sm:mt-0 w-max h-fit text-center px-3 py-1 bg-green-500 hover:bg-green-500/60 duration-300 rounded text-white cursor-pointer">Show Post</button></td>

            <td>{practice_area}</td>

            <td className='flex justify-center items-center gap-5 lg:gap-8 cursor-pointer mx-auto'>
                <AiOutlineDelete onClick={handleCaseDelete} className='hover:bg-red-100 text-red-500 rounded-full text-3xl p-1' />
                <FiEdit onClick={handleCaseUpdate} className='hover:bg-green-100 text-green-500 rounded-full text-3xl p-1' />
            </td>
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

export default MyCasesTableRow;