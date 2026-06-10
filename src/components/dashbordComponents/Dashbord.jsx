import {
  FiMenu,
  FiBell,
  FiMail,
  FiSettings,
  FiHome,
  FiSearch,
  FiUser,
} from "react-icons/fi";

import { Button, Drawer } from "@heroui/react";

export function DashbordSidebar() {
  const navItems = [
    { icon: FiHome, label: "Home" },
    { icon: FiSearch, label: "Search" },
    { icon: FiBell, label: "Notifications" },
    { icon: FiMail, label: "Messages" },
    { icon: FiUser, label: "Profile" },
    { icon: FiSettings, label: "Settings" },
  ];

const navContaint= <>
 <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                  >
                    <item.icon size={20} className="text-muted-foreground" />
                    {item.label}
                  </button>
                ))}
              </nav>
</>

  return (
   <>
    <aside className="hidden p-4 w-70 border-r border-default shrink-0 lg:block ">
     {navContaint}
    </aside>
    <Drawer >
      <Button className="lg:hidden" variant="secondary">
        <FiMenu size={18} />
        
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
             {navContaint}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
   </>
  );
}