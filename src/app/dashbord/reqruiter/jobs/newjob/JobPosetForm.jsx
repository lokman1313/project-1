"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";

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
  DateField,
} from "@heroui/react";

import { FiBriefcase, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { creatJobs } from "@/lib/action/jobs";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export default function PostJobPosetForm({ company }) {
  const router = useRouter();

  // ---- COMPANY না থাকলে এই UI দেখাবে ----
  if (!company || !company._id) {
    return (
      <div className="min-h-screen bg-[#0d0d0e] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-[#121214] border border-zinc-900 rounded-xl p-10 space-y-5">
          <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center mx-auto">
            <FiAlertCircle className="text-2xl text-yellow-400" />
          </div>

          <h1 className="text-2xl font-semibold">No Company Found</h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Before posting a job, you must register your company first. Job
            posting is not possible without a registered company.
          </p>

          <Button
            onClick={() => router.push("/dashbord/reqruiter/company")}
            className="bg-white text-black w-full"
          >
            Register Your Company
          </Button>
        </div>
      </div>
    );
  }

  // ---- COMPANY থাকলে নিচের পুরো ফর্ম দেখাবে ----
 const STATUS_CONFIG = {
   Approve: {
     label: "Approved",
     icon: <FaCheckCircle className="text-[10px]" />,
     classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
   },
   Pending: {
     label: "Pending review",
     icon: <FaClock className="text-[10px]" />,
     classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
   },
   Reject: {
     label: "Rejected",
     icon: <FaTimesCircle className="text-[10px]" />,
     classes: "bg-rose-500/10 text-rose-400 border-rose-500/20",
   },
 };
 
 function StatusBadge({ status }) {
   const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
   return (
     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${cfg.classes}`}>
       {cfg.icon} {cfg.label}
     </span>
   );
 }

  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (company.status !== "Approve") {
      toast.error("Company must be approved first");
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (isRemote) {
      formData.set("location", "Remote");
    }

    const data = Object.fromEntries(formData.entries());

    const newErrors = {};

    if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!data.jobCategory) newErrors.jobCategory = "Job category required";
    if (!data.jobType) newErrors.jobType = "Job type required";
    if (!data.minSalary) newErrors.minSalary = "Minimum salary required";
    if (!data.maxSalary) newErrors.maxSalary = "Maximum salary required";
    if (!data.currency) newErrors.currency = "Select salary currency";
    if (!isRemote && !data.location) newErrors.location = "Location required";
    if (!data.deadline) newErrors.deadline = "Deadline required";
    if (!data.responsibilities) newErrors.responsibilities = "Required";
    if (!data.requirements) newErrors.requirements = "Required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      ...data,
      isRemote,
      companyId: company._id,
      companyName: company.name,
      companyLogo: company.logo,
      status: "active",
      isPubliclyVisible: true,
    };

    const res = await creatJobs(payload);
    if(res.insertedId){
      toast.success("Job Added Sucsessfully")
      redirect("/dashbord/reqruiter/jobs")
    }
  };

  const textInputClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] rounded-lg h-12 px-3 text-sm";
  const textAreaClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] rounded-lg p-3";
  const triggerClasses =
    "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white";
  const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 rounded-lg";

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8">
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Post a New Job</h1>
            <h2>
              Company Status : <StatusBadge status={company.status} />
            </h2>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
            <FiBriefcase />
            Posting as:
            <span className="text-zinc-200">{company.name}</span>
          </div>
        </div>

        <Form
          onSubmit={handleSubmit}
          validationErrors={errors}
          validationBehavior="aria"
          className="space-y-8"
        >
          <Fieldset className="space-y-6">
            <legend className="text-lg border-b border-zinc-900 pb-2">
              Job Information
            </legend>

            <div className="grid md:grid-cols-2 gap-6">
              <TextField name="jobTitle" isInvalid={!!errors.jobTitle}>
                <Label>Job Title</Label>
                <Input
                  className={textInputClass}
                  placeholder="Senior Developer"
                />
                <FieldError />
              </TextField>

              <Select name="jobCategory" isInvalid={!!errors.jobCategory}>
                <Label>Job Category</Label>
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
              <Select name="jobType">
                <Label>Job Type</Label>
                <Select.Trigger className={triggerClasses}>
                  <Select.Value />
                </Select.Trigger>
                <Select.Popover className={popoverClasses}>
                  <ListBox>
                    <ListBox.Item id="full-time">Full Time</ListBox.Item>
                    <ListBox.Item id="part-time">Part Time</ListBox.Item>
                    <ListBox.Item id="contract">Contract</ListBox.Item>
                    <ListBox.Item id="internship">Internship</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <div className="space-y-2">
                <Label>Salary</Label>
                <div className="grid grid-cols-3 gap-2">
                  <TextField name="minSalary">
                    <Input
                      className={textInputClass}
                      placeholder="Min"
                      type="number"
                    />
                  </TextField>

                  <TextField name="maxSalary">
                    <Input
                      className={textInputClass}
                      placeholder="Max"
                      type="number"
                    />
                  </TextField>

                  <Select
                    placeholder="select currency"
                    name="currency"
                    defaultSelectedKeys={new Set(["USDT"])}
                  >
                    <Select.Trigger className={triggerClasses}>
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Popover className={popoverClasses}>
                      <ListBox>
                        <ListBox.Item id="USDT">USDT</ListBox.Item>
                        <ListBox.Item id="BDT">BDT</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <TextField name="location" isInvalid={!!errors.location}>
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-400 text-sm">Location</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">Remote</span>
                    <Switch
                      aria-label="Enable remote job"
                      isSelected={isRemote}
                      onChange={setIsRemote}
                    >
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch>
                  </div>
                </div>

                <Input
                  name="location"
                  value={isRemote ? "Remote" : undefined}
                  readOnly={isRemote}
                  className={textInputClass}
                  placeholder="Enter location"
                />

                {errors.location && <FieldError>{errors.location}</FieldError>}
              </TextField>

              <DateField name="deadline">
                <Label>Application Deadline</Label>
                <DateField.Group className={textInputClass}>
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                </DateField.Group>
              </DateField>
            </div>
          </Fieldset>

          <Fieldset className="space-y-6">
            <legend className="text-lg border-b border-zinc-900 pb-2">
              Job Details
            </legend>

            <TextField name="responsibilities">
              <Label>Responsibilities</Label>
              <TextArea rows={4} className={textAreaClass} />
            </TextField>

            <TextField name="requirements">
              <Label>Requirements</Label>
              <TextArea rows={4} className={textAreaClass} />
            </TextField>
          </Fieldset>

          <div className="flex justify-end gap-3">
            <Button variant="bordered">Cancel</Button>
            <Button type="submit" className="bg-white text-black">
              Post Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
