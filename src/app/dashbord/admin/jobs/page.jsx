import JobsTable from "@/components/dashbordComponents/JobsTable";
import { getJobs } from "@/lib/api/jobs";


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
    </div>
  );
};

export default JobsTablePage;