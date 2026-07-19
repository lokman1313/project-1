import { getApprovedCompanies } from "@/lib/api/company";
import CompaniesClient from "@/components/CompaniesClient";

export const dynamic = "force-dynamic";

export default async function CompanyPage() {
  const companies = await getApprovedCompanies();

  return <CompaniesClient initialCompanies={companies} />;
}