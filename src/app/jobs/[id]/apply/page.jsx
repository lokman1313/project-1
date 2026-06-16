import { getJobById } from '@/lib/api/jobs';
import { userSession } from '@/lib/core/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApplyForm from './JobApplyForm';
import { getApplicationById } from '@/lib/api/application';

const ApplyPage = async ({ params }) => {
    const user = await userSession();
    const { id } = await params;
    
    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== "seeker") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 text-slate-100">
                <div className="text-center p-8 bg-slate-900 rounded-2xl shadow-2xl max-w-md border border-slate-800">
                    <div className="w-16 h-16 bg-red-950/50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-900/30">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-slate-100 text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-slate-400 mb-6 text-sm">You do not have permission to view this page. Only job seekers can access it.</p>
                    <Link href="/" className="inline-block w-full bg-slate-100 text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition shadow-sm">
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    const applications = await getApplicationById(user?.id);
    const plan = {
        name: "Free Plan",
        maxApplyPerMonth: 3
    };
    
    const job = await getJobById(id);
    const applicationCount = applications?.length || 0;
    const hasReachedLimit = applicationCount >= plan.maxApplyPerMonth;
    const progressPercentage = Math.min((applicationCount / plan.maxApplyPerMonth) * 100, 100);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Tracker Card */}
                <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize mb-2">
                                {plan.name}
                            </span>
                            <h2 className="text-lg font-semibold text-slate-100">
                                Monthly Applications Tracker
                            </h2>
                            <p className="text-sm text-slate-400 mt-1">
                                You have used <span className="font-bold text-slate-200">{applicationCount}</span> out of <span className="font-bold text-slate-200">{plan.maxApplyPerMonth}</span> applications this month.
                            </p>
                        </div>
                        
                        {/* Dynamic Upgrade Button */}
                        {hasReachedLimit && (
                            <Link href="/pricing" className="inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/10 transition-all whitespace-nowrap">
                                Upgrade Plan
                            </Link>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-5">
                        <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                            <div 
                                className={`h-2.5 rounded-full transition-all duration-500 ${hasReachedLimit ? 'bg-amber-500' : 'bg-blue-500'}`}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className=" rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
                    {/* Job Header Summary */}
                    <div className="border-b border-slate-800 bg-slate-900/50 p-6">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Applying For</span>
                        <h1 className="text-xl font-bold text-slate-100 mt-1">{job?.title || "Job Position"}</h1>
                        <p className="text-sm text-slate-400 mt-1">{job?.company || "Company Name"}</p>
                    </div>

                    {/* Conditional Rendering of Form or Locked State */}
                    <div className="p-6">
                        {!hasReachedLimit ? (
                            <JobApplyForm applicant={user} job={job} />
                        ) : (
                            <div className="text-center py-10 px-4">
                                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0-8v6m0 5h.01M4.93 4.93l14.14 14.14" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-slate-100">Application Limit Reached</h3>
                                <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                                    You've used all 3 free applications for this month. Upgrade your plan to keep applying to premier jobs.
                                </p>
                                <Link href="/pricing" className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl text-slate-900 bg-slate-100 hover:bg-slate-200 transition shadow-sm">
                                    View Pricing Plans
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ApplyPage;