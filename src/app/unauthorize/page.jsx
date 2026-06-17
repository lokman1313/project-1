import Link from "next/link";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

const UnauthorizePage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <FaShieldAlt className="text-6xl text-red-500" />
                </div>

                <h1 className="text-7xl font-bold ">403</h1>

                <h2 className="mt-4 text-2xl font-semibold text-blue-200">
                    Unauthorized Access
                </h2>

                <p className="mt-3 text-gray-300">
                    Sorry, you do not have permission to view this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>

                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white font-medium transition hover:bg-blue-700"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizePage;