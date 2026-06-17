import { requerRole } from "@/lib/core/session";

const SeekerLayout = async({ children }) => {
    await requerRole("seeker")
    return children
};

export default SeekerLayout;