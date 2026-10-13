"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="block md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 ">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
