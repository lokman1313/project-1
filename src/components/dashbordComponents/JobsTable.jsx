"use client";

import { Button, Chip, Table } from "@heroui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const statusColorMap = {
  active: "success",
  inactive: "danger",
  pending: "warning",
};

export default function JobsTable({ jobs }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Jobs Table"
          className="min-w-[1000px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>Job Title</Table.Column>
            
            <Table.Column>Type</Table.Column>
            
            <Table.Column>Location</Table.Column>
            <Table.Column>Deadline</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="text-end">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {jobs?.map((job) => (
              <Table.Row key={job._id} id={job._id}>
                <Table.Cell>
                  <div>
                    <p className="font-medium">{job.jobTitle}</p>
                    <p className="text-xs text-muted">
                      #{job._id.slice(-6)}
                    </p>
                  </div>
                </Table.Cell>

               

                <Table.Cell>
                  <Chip size="sm" variant="soft">
                    {job.jobType}
                  </Chip>
                </Table.Cell>

                

                <Table.Cell>
                  {job.isRemote ? (
                    <Chip color="success" size="sm" variant="soft">
                      Remote
                    </Chip>
                  ) : (
                    job.location
                  )}
                </Table.Cell>

                <Table.Cell>
                  {job.deadline}
                </Table.Cell>

                <Table.Cell>
                  <Chip
                    color={statusColorMap[job.status] || "default"}
                    size="sm"
                    variant="soft"
                  >
                    {job.status}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex justify-end items-center gap-1">
                    <Button isIconOnly size="sm" variant="tertiary">
                      <FiEye />
                    </Button>

                    <Button isIconOnly size="sm" variant="tertiary">
                      <FiEdit2 />
                    </Button>

                    <Button isIconOnly size="sm" variant="danger-soft">
                      <FiTrash2 />
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