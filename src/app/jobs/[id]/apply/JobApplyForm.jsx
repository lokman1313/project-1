"use client";

import React from "react";

import {
  Form,
  Fieldset,
  FieldGroup,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  FieldError,
  Button,
} from "@heroui/react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaAddressCard,
  
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { toast } from "react-toastify";
import { creatApplication } from "@/lib/action/application";

export default function JobApplyForm({ job, applicant }) {
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      ...Object.fromEntries(formData.entries()),
      applicantId:applicant?.id,
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      companyName : job?.companyName
    };
    const res =await creatApplication(data)
    console.log(data);
    if(res.insertedId){
        toast.success("Application submitted successfully!");
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-default-200  p-8 shadow-sm">

      <div className="mb-8">
        <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Applying For
        </span>

        <h1 className="mt-3 text-3xl font-bold">
          {job?.jobTitle || "Job Position"}
        </h1>

        {job?.companyName && (
          <p className="mt-2 text-default-500">
            {job.companyName}
          </p>
        )}
      </div>

      <Form onSubmit={handleSubmit} validationBehavior="native">
        <Fieldset>

          <Fieldset.Legend>
            Applicant Information
          </Fieldset.Legend>

          <Description>
            Complete your details below.
          </Description>

          <FieldGroup>

            <TextField
              isRequired
              name="name"
              defaultValue={applicant?.name || ""}
            >
              <Label className="flex items-center gap-2">
                <FaUser />
                Full Name
              </Label>

              <Input placeholder="John Doe" />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              defaultValue={applicant?.email || ""}
            >
              <Label className="flex items-center gap-2">
                <FaEnvelope />
                Email Address
              </Label>

              <Input placeholder="john@example.com" />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="phone"
              type="tel"
            >
              <Label className="flex items-center gap-2">
                <FaPhone />
                Phone Number
              </Label>

              <Input placeholder="+8801XXXXXXXXX" />

              <FieldError />
            </TextField>

            <TextField type="url" name="resume">
              <Label className="flex items-center gap-2">
                <FaAddressCard />
                Resume/CV
              </Label>

              <Input placeholder="Your CV link" />

              <Description>
                Optional
              </Description>

              <FieldError />
            </TextField>

            <TextField type="text" name="message">
  <Label className="flex items-center gap-2">
   <FaMessage />
    Cover Message
  </Label>

  <TextArea
    placeholder="Tell the recruiter why you're a good fit..."
    className="min-h-32"
  />

  <Description>
    Optional but recommended
  </Description>

  <FieldError />
</TextField>
          </FieldGroup>

          <Fieldset.Actions>

            <Button
              type="reset"
              variant="secondary"
            >
              Reset
            </Button>

            <Button
              type="submit"
              color="primary"
              endContent={<FaPaperPlane />}
            >
              Submit Application
            </Button>

          </Fieldset.Actions>

        </Fieldset>
      </Form>
    </div>
  );
}