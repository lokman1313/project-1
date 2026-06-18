"use client";

import { updateStatus } from "@/lib/action/company";
import { Table, Chip, Button } from "@heroui/react";
import Image from "next/image";
import { toast } from "react-toastify";

const statusDotColorMap = {
  Pending: "bg-amber-500",
  Approve: "bg-emerald-500",
  Reject: "bg-rose-500",
};

const statusTextColorMap = {
  Pending: "text-amber-500",
  Approve: "text-emerald-500",
  Reject: "text-rose-500",
};

const CompanyTable = ({ companies = [] }) => {
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleApprove = async (id) => {
    const result =await updateStatus(id,{status : "Approve"})
    if(result.modifiedCount){
        toast.success("Company Approved")
    }
  };

  const handleReject = async (id) => {
    const result =await updateStatus(id,{status : "Reject"})
     if(result.modifiedCount){
        toast.warning("Company Rejected")
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#121214] text-gray-200">
      <Table className="bg-[#18181b] border border-neutral-800 rounded-xl overflow-hidden">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Recruiter Admin Companies Table"
            className="min-w-[1100px] lg:min-w-full"
          >
            <Table.Header className="bg-[#1c1c1f] text-neutral-400 border-b border-neutral-800">
              <Table.Column
                isRowHeader
                className="py-4 text-xs font-medium uppercase tracking-wider"
              >
                Company Name
              </Table.Column>

              <Table.Column className="py-4 text-xs font-medium uppercase tracking-wider">
                Recruiter Email
              </Table.Column>

              <Table.Column className="py-4 text-xs font-medium uppercase tracking-wider">
                Industry
              </Table.Column>

              <Table.Column className="py-4 text-xs font-medium uppercase tracking-wider">
                Status
              </Table.Column>

              <Table.Column className="py-4 text-xs font-medium uppercase tracking-wider">
                Date Submitted
              </Table.Column>

              <Table.Column className="py-4 text-xs font-medium uppercase tracking-wider text-end">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {companies.map((company) => {
                const dotColor =
                  statusDotColorMap[company?.status] || "bg-neutral-500";

                const textColor =
                  statusTextColorMap[company?.status] ||
                  "text-neutral-400";

                return (
                  <Table.Row
                    key={String(company?._id)}
                    id={String(company?._id)}
                    className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors"
                  >
                    {/* Company */}
                    <Table.Cell className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden shrink-0">
                          {company?.logo ? (
                            <Image
                              src={company.logo}
                              alt={`${company?.name || "Company"} logo`}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-sm font-semibold text-neutral-200">
                              {getInitials(
                                company?.name ||
                                  company?.companyName ||
                                  ""
                              )}
                            </div>
                          )}
                        </div>

                        <span className="font-medium text-white whitespace-nowrap">
                          {company?.name ||
                            company?.companyName ||
                            "Unknown Company"}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Email */}
                    <Table.Cell className="py-5 text-neutral-400 whitespace-nowrap">
                      {company?.recruiterEmail ||
                        company?.website ||
                        "—"}
                    </Table.Cell>

                    {/* Industry */}
                    <Table.Cell className="py-5">
                      <Chip
                        size="sm"
                        className="bg-neutral-800/50 text-neutral-400 border border-neutral-800/80"
                      >
                        {company?.industry || "General"}
                      </Chip>
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell className="py-5">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span
                          className={`w-2 h-2 rounded-full ${dotColor}`}
                        />

                        <span
                          className={`text-sm font-medium ${textColor}`}
                        >
                          {company?.status || "Unknown"}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Date */}
                    <Table.Cell className="py-5 text-neutral-400 whitespace-nowrap">
                      {company?.createdAt || "—"}
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell className="py-5">
                      <div className="flex justify-end items-center gap-2 whitespace-nowrap">
                        {company?.status !== "Approve" && (
                          <Button
                            size="sm"
                            onPress={() =>
                              handleApprove(company?._id)
                            }
                            className="bg-emerald-950/40 text-emerald-500 hover:bg-emerald-900/40 border border-emerald-900/50 px-4 font-medium rounded-md"
                          >
                            Approve
                          </Button>
                        )}

                        {company?.status !== "Reject" && (
                          <Button
                            size="sm"
                            onPress={() =>
                              handleReject(company?._id)
                            }
                            className="bg-rose-950/30 text-rose-500 hover:bg-rose-900/30 border border-rose-950/60 px-4 font-medium rounded-md"
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default CompanyTable;