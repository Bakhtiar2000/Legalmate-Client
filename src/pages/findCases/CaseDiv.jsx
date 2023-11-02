import React from 'react';

const CaseDiv = ({singleCase}) => {
    const {_id, writer, writer_id, email, location, status, practice_area, case_post}= singleCase
    console.log(singleCase);

    return (
        <div className='rounded-lg p-5 max-w-5xl bg-lightDark border border-primary mb-5 shadow-lg hover:shadow-white/40 duration-300 mx-auto'>
            <div className='flex justify-between items-center gap-5 mb-3 border border-primary px-3 py-2 rounded'>
                <div>
                    <p className='font-semibold text-lg'>{writer}</p>
                    <p>{location}</p>
                    <p className='text-sm'>Searching specialist in {practice_area}</p>
                </div>
                <div>
                    <button className='text-center px-4 py-2 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white'>
                        Message
                    </button>
                </div>
            </div>
            <p>{case_post}</p>
        </div>
    );
};

export default CaseDiv;