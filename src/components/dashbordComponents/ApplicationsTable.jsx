"use client";

import { Button, Chip, Table } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const statusColorMap = {
  applied: "primary",
  review: "warning",
  shortlisted: "success",
  rejected: "danger",
  offered: "primary",
};

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function ApplicationsTable({ applications }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Applications Table"
          className="min-w-[900px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            <Table.Column>Company</Table.Column>
            <Table.Column>Applied</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="text-end">Action</Table.Column>
          </Table.Header>

          <Table.Body>
            {applications?.map((app) => {
             const status = (app.status || "applied").toLowerCase();
console.log("status:", status, "color:", statusColorMap[status]);

              return (
                <Table.Row key={app._id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-default-100 overflow-hidden">
                        <Image
                          src={app.companyLogo}
                          alt={app.companyName}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="font-medium">{app.jobTitle}</p>
                    </div>
                  </Table.Cell>

                  <Table.Cell>{app.companyName}</Table.Cell>

                  <Table.Cell>{timeAgo(app.createdAt)}</Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="success"
                      color={statusColorMap[status] || "default"}
                      className="capitalize"
                    >
                      {status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex justify-end">
                      <Button
                        as={Link}
                        href={`/dashboard/applications/${app._id}`}
                        size="sm"
                        variant="tertiary"
                      >
                        Details
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
