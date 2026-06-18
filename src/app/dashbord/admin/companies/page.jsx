import CompanyTable from "@/components/CompanyTable";
import { getAllCompanies } from "@/lib/api/company";


const AllCompanyPage = async () => {
  const companies = await getAllCompanies();


  return (
   <div>
    <CompanyTable companies={companies}></CompanyTable>
   </div>
  );
};

export default AllCompanyPage;