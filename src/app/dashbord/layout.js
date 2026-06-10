import { DashbordSidebar } from "@/components/dashbordComponents/Dashbord";

const DashbordLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <DashbordSidebar />
           <div className="flex-1">
            { children }
            </div> 
        </div>
    );
};

export default DashbordLayout;