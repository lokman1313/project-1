import JobsTable from "@/components/dashbordComponents/JobsTable";
import { getLoggedInReqruiter } from "@/lib/api/company";
import { getCompanyJobs } from "@/lib/api/jobs";


const JobsPage = async () => {

  const company = await getLoggedInReqruiter()

  console.log(company)

  const allJobs = await getCompanyJobs(company._id);

  // console.log(company._id)

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