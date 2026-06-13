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
  DateField,
} from "@heroui/react";

import { FiBriefcase } from "react-icons/fi";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { creatJobs } from "@/lib/action/jobs";

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
      toast.error("Company must be approved first");
      return;
    }
    const formData = new FormData(e.currentTarget);
    
    if (isRemote) {
      formData.set("location", "Remote");
    }

    const data = Object.fromEntries(formData.entries());

    const newErrors = {};

    if (!data.jobTitle)
      newErrors.jobTitle = "Job title is required";

    if (!data.jobCategory)
      newErrors.jobCategory = "Job category required";

    if (!data.jobType)
      newErrors.jobType = "Job type required";

    if (!data.minSalary)
      newErrors.minErrors = "Minimum salary required";

    if (!data.maxSalary)
      newErrors.maxSalary = "Maximum salary required";

    if (!data.currency)
      newErrors.currency = "Select salary currency";

    if (!isRemote && !data.location)
      newErrors.location = "Location required";

    if (!data.deadline)
      newErrors.deadline = "Deadline required";

    if (!data.responsibilities)
      newErrors.responsibilities = "Required";

    if (!data.requirements)
      newErrors.requirements = "Required";

    if (Object.keys(newErrors).length) {
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

    const res = await creatJobs(payload) ;
    
  };

  const textInputClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] rounded-lg h-12 px-3 text-sm";

  const textAreaClass =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] rounded-lg p-3";

  const triggerClasses =
    "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] h-12 rounded-lg px-3 text-white";

  const popoverClasses =
    "bg-[#1c1c1e] border border-zinc-800 rounded-lg";

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">

      <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8">

        {/* HEADER */}

        <div className="border-b border-zinc-800 pb-6 mb-8">

          <h1 className="text-2xl font-semibold">
            Post a New Job
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
            <FiBriefcase />
            Posting as:
            <span className="text-zinc-200">
              {mockCompany.name}
            </span>
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

            {/* TITLE + CATEGORY */}

            <div className="grid md:grid-cols-2 gap-6">

              <TextField
                name="jobTitle"
                isInvalid={!!errors.jobTitle}
              >
                <Label>Job Title</Label>

                <Input
                  className={textInputClass}
                  placeholder="Senior Developer"
                />

                <FieldError />
              </TextField>


              <Select
                name="jobCategory"
                isInvalid={!!errors.jobCategory}
              >

                <Label>Job Category</Label>

                <Select.Trigger className={triggerClasses}>
                  <Select.Value />
                </Select.Trigger>

                <Select.Popover className={popoverClasses}>
                  <ListBox>
                    <ListBox.Item id="tech">
                      Technology
                    </ListBox.Item>

                    <ListBox.Item id="design">
                      Design
                    </ListBox.Item>

                    <ListBox.Item id="marketing">
                      Marketing
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>

              </Select>

            </div>

            {/* TYPE + SALARY */}

            <div className="grid md:grid-cols-2 gap-6">

              <Select name="jobType">
                <Label>Job Type</Label>

                <Select.Trigger className={triggerClasses}>
                  <Select.Value />
                </Select.Trigger>

                <Select.Popover className={popoverClasses}>
                  <ListBox>

                    <ListBox.Item id="full-time">
                      Full Time
                    </ListBox.Item>

                    <ListBox.Item id="part-time">
                      Part Time
                    </ListBox.Item>

                    <ListBox.Item id="contract">
                      Contract
                    </ListBox.Item>

                    <ListBox.Item id="internship">
                      Internship
                    </ListBox.Item>

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
                  
                  {/* FIX 2: defaultSelectedKeys-কে সঠিকভাবে Set দিয়ে অবজেক্ট আকারে এবং Select.Value সহজ করা */}
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
                        <ListBox.Item id="USDT">
                          USDT
                        </ListBox.Item>

                        <ListBox.Item id="BDT">
                          BDT
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                </div>

              </div>

            </div>

            

            {/* LOCATION + DEADLINE */}

            <div className="grid md:grid-cols-2 gap-6">

              <TextField
                name="location"
                isInvalid={!!errors.location}
              >

                <div className="flex items-center justify-between">

                  <Label className="text-zinc-400 text-sm">
                    Location
                  </Label>

                  <div className="flex items-center gap-2">

                    <span className="text-xs text-zinc-500">
                      Remote
                    </span>

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

                {/* FIX 3: disabled এর বদলে readOnly করা হয়েছে যাতে React এরর না দেয় এবং ডেটা সাবমিট হয় */}
                <Input
                  name="location"
                  value={isRemote ? "Remote" : undefined}
                  readOnly={isRemote}
                  className={textInputClass}
                  placeholder="Enter location"
                />

                {errors.location && (
                  <FieldError>
                    {errors.location}
                  </FieldError>
                )}

              </TextField>


              <DateField
                name="deadline"
              >

                <Label>
                  Application Deadline
                </Label>

                <DateField.Group
                  className={textInputClass}
                >
                  <DateField.Input>
                    {(segment) => (
                      <DateField.Segment
                        segment={segment}
                      />
                    )}
                  </DateField.Input>
                </DateField.Group>

              </DateField>

            </div>

          </Fieldset>

          {/* DETAILS */}

          <Fieldset className="space-y-6">

            <legend className="text-lg border-b border-zinc-900 pb-2">
              Job Details
            </legend>

            <TextField
              name="responsibilities"
            >

              <Label>
                Responsibilities
              </Label>

              <TextArea
                rows={4}
                className={textAreaClass}
              />

            </TextField>


            <TextField
              name="requirements"
            >

              <Label>
                Requirements
              </Label>

              <TextArea
                rows={4}
                className={textAreaClass}
              />

            </TextField>

          </Fieldset>

          <div className="flex justify-end gap-3">

            <Button
              variant="bordered"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-white text-black"
            >
              Post Job
            </Button>

          </div>

        </Form>

      </div>

    </div>
  );
}