import { requerRole } from "@/lib/core/session";

const RecruiterLayout = async({ children }) => {
    await requerRole("recruiter")
    return children
};

export default RecruiterLayout;