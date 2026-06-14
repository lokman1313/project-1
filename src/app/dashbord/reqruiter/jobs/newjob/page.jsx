import React from 'react';
import PostJobPosetForm from './JobPosetForm';
import { getLoggedInReqruiter } from '@/lib/api/company';

const NewJobPage = async() => {
    const company = await getLoggedInReqruiter()
    console.log(company)
    return (
        <div>
            <PostJobPosetForm company={company}></PostJobPosetForm>
        </div>
    );
};

export default NewJobPage;