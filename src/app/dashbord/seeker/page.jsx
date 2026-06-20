import { getApplicationById } from "@/lib/api/application";
import { userSession } from "@/lib/core/session";
import { FaFileAlt, FaClock, FaCheckCircle, FaBriefcase } from "react-icons/fa";

const Page = async () => {
  const user = await userSession();
  const applications = await getApplicationById(user.id);

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (app) => app.status === "applied"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "interview"
  ).length;

  const acceptedCount = applications.filter(
    (app) => app.status === "accepted"
  ).length;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <FaFileAlt />
        <p>Total Applications</p>
        <h2 className="text-xl font-bold">{totalApplications}</h2>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <FaBriefcase />
        <p>Applied</p>
        <h2 className="text-xl font-bold">{appliedCount}</h2>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <FaClock />
        <p>Interview</p>
        <h2 className="text-xl font-bold">{interviewCount}</h2>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <FaCheckCircle />
        <p>Accepted</p>
        <h2 className="text-xl font-bold">{acceptedCount}</h2>
      </div>

    </div>
  );
};

export default Page;