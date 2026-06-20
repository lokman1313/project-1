
import JobListingContainer from '@/components/jobs/JobListingContainer';
import { getJobs } from '@/lib/api/jobs';

// Force dynamic ensures fresh job data isn't aggressively stale-cached by Next.js
export const dynamic = 'force-dynamic'; 

export default async function Page({searchParams}) {

    const searchQuery = await searchParams
    const filterObj = {
        ...searchQuery ,
        isRemote : searchQuery.isRemote === "true" ? true : false
    }
    const sp= new URLSearchParams(searchQuery)
    const quary = sp.toString()
    console.log(quary)
    const {jobs , total} = await getJobs(quary);

    return (
        <main className="min-h-screen py-12 container mx-auto">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    Explore Available Jobs
                </h1>
                <p className="mt-2 text-lg text-zinc-400">
                    Find your next career opportunity with top companies.
                </p>
            </div>
            
            <JobListingContainer filters={filterObj} jobs={jobs || {}} total={total} />
        </main>
    );
}