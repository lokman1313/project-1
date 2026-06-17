
import ApplicationsTable from "@/components/dashbordComponents/ApplicationsTable";
import { getApplicationById } from "@/lib/api/application";
import { userSession } from "@/lib/core/session";
import React from "react";

const ApplicationsPage = async () => {
  const user = await userSession();
  const applications = await getApplicationById(user.id);

  return (
    <div className="space-y-4 p-6">
      <div>
        <h1 className="text-xl font-semibold">My Applications</h1>
        <p className="text-sm text-muted">
          Track the jobs you've applied to and where they stand.
        </p>
      </div>

      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default ApplicationsPage;