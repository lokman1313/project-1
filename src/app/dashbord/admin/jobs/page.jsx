import JobsTable from "@/components/dashbordComponents/JobsTable";
import { getJobs } from "@/lib/api/jobs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const JobsTablePage = async () => {
  const allJobs = await getJobs();
  const jobs = allJobs?.jobs || allJobs || [];

  return (
    <div className=" p-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          All Jobs
        </h1>
        <p className="text-zinc-400">
          Manage all posted jobs
        </p>
      </div>

      <JobsTable jobs={jobs} />
      {/* Pagination Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500 select-none">
                <div>Showing 1 to {jobs.length} of 12,842 users</div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:text-zinc-300 transition-colors">
                    <FaChevronLeft size={14} />
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center bg-white text-zinc-900 rounded font-medium">
                    1
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
                    2
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
                    3
                  </button>
                  <span className="px-1 text-zinc-600">...</span>
                  <button className="w-fit px-1.5 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
                    1285
                  </button>
                  <button className="p-1 hover:text-zinc-300 transition-colors">
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
    </div>
  );
};

export default JobsTablePage;