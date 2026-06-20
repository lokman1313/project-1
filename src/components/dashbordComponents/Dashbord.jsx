"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiMenu,
  FiPlusCircle,
  FiHome,
  FiBriefcase,
  FiUser,
} from "react-icons/fi";
import { Button, Drawer } from "@heroui/react";
import { FaBookmark, FaBriefcase, FaBuilding, FaCog, FaCreditCard, FaFileAlt, FaHome, FaRegBuilding, FaSearch, FaUsers } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";



export function DashbordSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

 const recruiterNavlinks =[
  {icon: FiHome, href: "/dashbord/reqruiter", label: "Home",},
    {icon: FiBriefcase,href: "/dashbord/reqruiter/jobs",label: "Jobs",},
    {icon: FiPlusCircle,href: "/dashbord/reqruiter/jobs/newjob", label: "Add New Job",},
    {icon: FaRegBuilding,href: "/dashbord/reqruiter/company",label: "Company",},
    { icon: FiUser, href: "/dashbord/reqruiter/profile", label: "Profile", },
  
 ]
  const seekerNavLinks = [
    { icon: FaHome, href: "/dashbord/seeker", label: "Dashboard" },
    { icon: FaSearch, href: "/jobs", label: "Jobs" },
    { icon: FaFileAlt, href: "/dashbord/seeker/applications", label: "Applications" },
    { icon: FiUser, href: "/dashbord/seeker/profile", label: "Profile" },
  ];
  const adminNavLinks = [
  { icon: FaHome, href: "/dashbord/admin", label: "Dashboard" },
  { icon: FaUsers, href: "/dashbord/admin/users", label: "Users" },
  { icon: FaBuilding, href: "/dashbord/admin/companies", label: "Companies" },
  { icon: FaBriefcase, href: "/dashbord/admin/jobs", label: "Jobs" },
  { icon: FaCreditCard, href: "/dashbord/admin/payments", label: "Payments" },
  { icon: FaCog, href: "/dashbord/admin/settings", label: "Settings" },
];

  const navlinks = {
    seeker : seekerNavLinks,
    recruiter : recruiterNavlinks,
    admin : adminNavLinks
  }
  const navItems = navlinks[user?.role || "seeker"];
  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors
              hover:bg-default
              ${isActive ? "bg-default font-medium" : ""}
            `}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-70 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <Drawer open={open} onOpenChange={setOpen}>
        <Button
          className="lg:hidden"
          variant="secondary"
          onPress={() => setOpen(true)}
        >
          <FiMenu size={18} />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}