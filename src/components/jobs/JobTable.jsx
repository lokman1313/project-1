"use client";

import {
  Table,
  Chip,
  Button,
} from "@heroui/react";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

export default function JobsTable({ jobs }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Jobs Table"
          className="min-w-[1000px]"
        >
          <Table.Header>
            <Table.Column>Job Title</Table.Column>
            <Table.Column>Company</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Type</Table.Column>
            <Table.Column>Salary</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Deadline</Table.Column>
            <Table.Column className="text-end">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {jobs.map((job) => (
              <Table.Row key={job._id}>
                <Table.Cell className="font-medium">
                  {job.jobTitle}
                </Table.Cell>

                <Table.Cell>
                  {job.companyName}
                </Table.Cell>

                <Table.Cell>
                  {job.location}
                </Table.Cell>

                <Table.Cell>
                  <Chip
                    size="sm"
                    color="primary"
                    variant="flat"
                  >
                    {job.jobType}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  {job.salary || "Negotiable"}
                </Table.Cell>

                <Table.Cell>
                  <Chip
                    size="sm"
                    color={
                      job.status === "active"
                        ? "success"
                        : "danger"
                    }
                    variant="flat"
                  >
                    {job.status || "active"}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  {new Date(
                    job.deadline
                  ).toLocaleDateString()}
                </Table.Cell>

                <Table.Cell>
                  <div className="flex justify-end gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                    >
                      <FaEye />
                    </Button>

                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                    >
                      <FaEdit />
                    </Button>

                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="light"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}