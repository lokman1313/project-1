import React from "react";
import { Card } from "@heroui/react";

/**
 * Individual Stat Card Component
 */
const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <Card className="bg-[#18181b] border border-neutral-800 rounded-2xl w-full p-6 flex flex-col justify-between gap-6 min-h-[160px]">
      
      {/* Icon Container - React Icons render directly inside */}
      <div className="flex items-center justify-center bg-neutral-800/60 rounded-xl w-10 h-10 text-neutral-400 text-xl">
        {Icon && <Icon />}
      </div>

      {/* Content Group */}
      <Card.Header className="p-0 flex flex-col gap-1 items-start">
        <Card.Description className="text-xs font-medium text-neutral-400 m-0">
          {title}
        </Card.Description>
        <Card.Title className="text-3xl font-semibold text-white tracking-tight m-0">
          {value}
        </Card.Title>
      </Card.Header>

    </Card>
  );
};

/**
 * Main Grid Component to map fed array data
 */
export default function DashboardStats({ data = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {data.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </div>
  );
}