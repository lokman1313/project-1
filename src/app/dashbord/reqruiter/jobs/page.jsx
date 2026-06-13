import JobsTable from "@/components/dashbordComponents/JobsTable";
import { getCompanyJobs } from "@/lib/api/jobs";


const JobsPage = async () => {
  const companyId = "company_123";

  const allJobs = await getCompanyJobs(companyId);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">
        All Jobs ({allJobs?.length || 0})
      </h2>

      <JobsTable jobs={allJobs || []} />
    </div>
  );
};

export default JobsPage;