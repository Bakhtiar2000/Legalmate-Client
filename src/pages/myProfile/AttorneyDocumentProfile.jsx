import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";

const AttorneyDocumentProfile = ({index, doc}) => {
    // Document delete
    const handleDocumentDelete = (index)=>{
        //TODO: delete operation
        console.log("Deleting Document", index);
    }
    return (
        <div className='relative group border border-white/40 rounded shadow-lg shadow-primary/20 px-3 md:px-5 py-1 md:py-3'>

            <p className='text-primary text-xl'>{doc?.link}</p>

            <button onClick={()=>handleDocumentDelete(index)} className="bg-primary/50 text-white hidden p-1 rounded-md absolute duration-300 hover:bg-primary shadow-lg text-sm shadow-purple/20 hover:shadow-white/20 group-hover:inline-block group-hover:bottom-1 group-hover:right-1">
                <AiOutlineDelete />
            </button>
        </div>
    );
};

export default AttorneyDocumentProfile;