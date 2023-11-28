import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useLoaderData } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { ImHammer2 } from "react-icons/im";

const BlogDetails = () => {
    const singleAwareness = useLoaderData()
    const { _id, question, answer, practice_area, read_time, asked_by, reader_count } = singleAwareness
    return (
        <div>
            <Helmet>
                <title>Awareness Details - Legalmate</title>
            </Helmet>
            <Breadcrumbs title="Awareness Details" />

            <div className='container py-20'>
                <div className='max-w-5xl mx-auto border border-primary/20 shadow-lg shadow-primary/50 rounded-lg p-10'>
                    {/* Top Section */}
                    <div className='flex justify-between items-center gap-5 mb-8'>
                        <p className='inline'><IoPerson  /> {asked_by || asked_by ==="" ? asked_by : "Unknown"}</p>
                        <p className='inline'><ImHammer2  /> {practice_area}</p>
                        <p className='inline'><FaEye /> {read_time}</p>
                        <p className='inline'><FaEye /> {reader_count}</p>
                    </div>

                    {/* QnA */}
                    <p className='mb-3 text-lg'>Question: {question}</p>
                    <p>Answer: {answer}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;