"use client";

import React, { useState } from "react";

import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    FieldError,
    Select,
    ListBox,
    Switch,
    Button,
    toast
} from "@heroui/react";

import { FiBriefcase, FiGlobe } from "react-icons/fi";


import { redirect } from "next/navigation";

export default function PostJobPage() {
    const [mockCompany] = useState({
        name: "Acme Corp (Auto-filled)",
        id: "company_123",
        isApproved: true,
    });

    const [isRemote, setIsRemote] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mockCompany.isApproved) {
            alert("Your company profile must be approved before you can post jobs.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const newErrors = {};
        if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
        if (!data.jobType) newErrors.jobType = "Job type is required";
        if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
        if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
        if (!isRemote && !data.location) newErrors.location = "Location is required for non-remote roles";
        if (!data.deadline) newErrors.deadline = "Application deadline is required";
        if (!data.responsibilities) newErrors.responsibilities = "Responsibilities are required";
        if (!data.requirements) newErrors.requirements = "Requirements are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const payload = {
            ...data,
            isRemote,
            companyId: mockCompany.id,
            status: "active",
            isPubliclyVisible: true,
        };

        const res = await createJob(payload);

        if (res.insertedId) {
            toast.success("Job posted successfully!");
            e.target.reset();
            setIsRemote(false);
            redirect("/dashboard/recruiter/jobs");
        }
    };

    const textInputClass =
        "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

    const textAreaClass =
        "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

    const triggerClasses =
        "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white transition-all text-sm outline-none";

    const popoverClasses =
        "bg-[#1c1c1e] border border-zinc-800 text-white rounded-lg shadow-xl p-1";

    const listItemClasses =
        "flex items-center justify-between p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-zinc-200 outline-none";

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
            <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8">

                {/* Header */}
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold">Post a New Job</h1>

                    <div className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-400">
                        <FiBriefcase size={14} />
                        Posting as: <span className="text-zinc-200">{mockCompany.name}</span>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior="aria">

                    {/* Job Info */}
                    <Fieldset className="space-y-6">
                        <legend className="text-lg text-zinc-300 border-b border-zinc-900 pb-2">
                            Job Information
                        </legend>

                        <div className="grid md:grid-cols-2 gap-6">

                            <TextField name="jobTitle" isInvalid={!!errors.jobTitle}>
                                <Label className="text-zinc-400 text-sm">Job Title</Label>
                                <Input className={textInputClass} placeholder="Senior Developer" />
                                {errors.jobTitle && <FieldError>{errors.jobTitle}</FieldError>}
                            </TextField>

                            <Select name="jobCategory" isInvalid={!!errors.jobCategory}>
                                <Label className="text-zinc-400 text-sm">Job Category</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value />
                                </Select.Trigger>

                                <Select.Popover className={popoverClasses}>
                                    <ListBox>
                                        <ListBox.Item id="tech">Technology</ListBox.Item>
                                        <ListBox.Item id="design">Design</ListBox.Item>
                                        <ListBox.Item id="marketing">Marketing</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

    {/* JOB TYPE SECTION */}
    <div className="space-y-2">
        <Label className="text-zinc-400 text-sm font-medium">
            Job Type
        </Label>

        <Select name="jobType" isInvalid={!!errors.jobType}>
            <Select.Trigger className={triggerClasses}>
                <Select.Value placeholder="Select job type" />
            </Select.Trigger>

            <Select.Popover className={popoverClasses}>
                <ListBox>
                    <ListBox.Item id="full-time">Full-time</ListBox.Item>
                    <ListBox.Item id="part-time">Part-time</ListBox.Item>
                    <ListBox.Item id="contract">Contract</ListBox.Item>
                    <ListBox.Item id="internship">Internship</ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>

        {errors.jobType && (
            <p className="text-xs text-red-500">{errors.jobType}</p>
        )}
    </div>

    {/* SALARY SECTION */}
    <div className="space-y-2">
        <Label className="text-zinc-400 text-sm font-medium">
            Salary Range
        </Label>

        <div className="grid grid-cols-2 gap-2">
            <TextField name="minSalary" isInvalid={!!errors.minSalary}>
                <Input
                    className={textInputClass}
                    placeholder="Min"
                    type="number"
                />
            </TextField>

            <TextField name="maxSalary" isInvalid={!!errors.maxSalary}>
                <Input
                    className={textInputClass}
                    placeholder="Max"
                    type="number"
                />
            </TextField>
        </div>

        {(errors.minSalary || errors.maxSalary) && (
            <p className="text-xs text-red-500">
                {errors.minSalary || errors.maxSalary}
            </p>
        )}
    </div>

</div>

                        <div className="flex items-center gap-2">
                            <FiGlobe size={16} />
                            <Input
                                name="location"
                                className={textInputClass}
                                placeholder={isRemote ? "Remote" : "Location"}
                                disabled={isRemote}
                            />
                        </div>
                    </Fieldset>

                    {/* Description */}
                    <Fieldset className="space-y-6">
                        <legend className="text-lg text-zinc-300 border-b border-zinc-900 pb-2">
                            Job Details
                        </legend>

                        <TextField name="responsibilities">
                            <TextArea className={textAreaClass} rows={4} placeholder="Responsibilities..." />
                        </TextField>

                        <TextField name="requirements">
                            <TextArea className={textAreaClass} rows={4} placeholder="Requirements..." />
                        </TextField>
                    </Fieldset>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="bordered">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-white text-black">
                            Post Job
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}