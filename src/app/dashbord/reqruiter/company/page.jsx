
import CompanySection from './CompanySection';
import { userSession } from '@/lib/core/session';
import { companyDataFetch } from '@/lib/api/company';


const CompanyPage = async() => {
    const user = await userSession()
    // console.log(user)
    const companyData = await companyDataFetch(user?.id)
    console.log(companyData)
    return (
        <div>
            <CompanySection reqruiter={user} requiterCompany={companyData}></CompanySection>
        </div>
    );
};

export default CompanyPage;