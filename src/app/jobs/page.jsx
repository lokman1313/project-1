
import JobListingContainer from '@/components/jobs/JobListingContainer';
import { getJobs } from '@/lib/api/jobs';

// Force dynamic ensures fresh job data isn't aggressively stale-cached by Next.js
export const dynamic = 'force-dynamic'; 

export default async function Page() {
    let initialJobs = [];
    let errorOccurred = false;
    
    try {
        initialJobs = await getJobs();
    } catch (error) {
        console.error("Error fetching jobs on server:", error);
        errorOccurred = true;
    }

    return (
        <main className="min-h-screen py-12 bg-black text-white">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
                    Explore Available Jobs
                </h1>
                <p className="mt-2 text-lg text-zinc-400">
                    Find your next career opportunity with top companies.
                </p>
            </div>
            
            {errorOccurred ? (
                <div className="text-center py-16 bg-red-950/20 rounded-[32px] border border-red-900/50 max-w-7xl mx-auto mx-4 sm:mx-6 lg:mx-8">
                    <p className="text-red-400 text-lg font-medium">
                        Failed to load jobs. Please try refreshing the page.
                    </p>
                </div>
            ) : (
                /* Pass fetched server data down to client container */
                <JobListingContainer initialJobs={initialJobs} />
            )}
        </main>
    );
}