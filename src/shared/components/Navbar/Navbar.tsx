"use client";

import NavbarSearch from "./NavbarSearch/NavbarSearch";
import DarkModeToggle from "./DarkModeToggle";
import MobileSidebar from "../sidebar/MobileSidebar";
// import NotificationsMenu from "./NotificationsMenu";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 md:ml-60 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <MobileSidebar />
          <NavbarSearch />
        </div>

        {/* Right side - Dark Mode, Notifications & Profile */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          {/* <NotificationsMenu /> */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
