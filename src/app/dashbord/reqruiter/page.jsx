"use client"

import DashboardStats from "@/components/dashbordComponents/DashboardStats";
import { authClient } from "@/lib/auth-client";
import { FaFileAlt, FaUsers, FaBolt, FaCheckCircle } from "react-icons/fa";


const RequiterDashbordPage = () => {
    const { data: session , isPending} = authClient.useSession();
    if(isPending){
        <h3>loding.....</h3>
    }
    const user = session?.user ;
   const recruiterData = [
    { 
      title: "Total Job Posts", 
      value: "48", 
      icon: FaFileAlt 
    },
    { 
      title: "Total Applicants", 
      value: "1,284", 
      icon: FaUsers 
    },
    { 
      title: "Active Jobs", 
      value: "18", 
      icon: FaBolt 
    },
    { 
      title: "Jobs Closed", 
      value: "32", 
      icon: FaCheckCircle 
    },
  ];
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Welcome back,<span className="text-3xl">{user?.name}</span></h1>
            <DashboardStats data={recruiterData}></DashboardStats>
        </div>
    );
};

export default RequiterDashbordPage;