"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useAuth } from "@/providers/AuthProvider";
import useNavbarSearchHook from "@/shared/hooks/NavbarSearchHook";
import NavbarContentSkeleton from "../NavbarContentSkeleton";
import AdminSearchView from "./views/AdminSearchView";
import DoctorSearchView from "./views/DoctorSearchView";
import PatientSearchView from "./views/PatientSearchView";

interface SearchProps {
  searchSidebar?: boolean;
}

export default function NavbarSearch({ searchSidebar = false }: SearchProps) {
  const {
    query,
    setQuery,
    results,
    isPending,
    total,
    handleOpenChange,
    open,
    hasQuery,
    role,
    hint,
  } = useNavbarSearchHook();

  const placeHolder =
    role === "admin"
      ? "Search patients, doctors, or appointments"
      : role === "doctor"
        ? "Search appointments or your patients"
        : "Search your appointments";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`flex h-9 w-full max-w-md items-center gap-2 rounded-md border border-input bg-input-background dark:bg-input/30 px-3 text-sm text-muted-foreground ${searchSidebar ? "sm:hidden" : "max-sm:hidden"}`}
        >
          <SearchIcon className="w-5 h-5 shrink-0 text-gray-400 dark:text-gray-500" />
          <span className="truncate">{placeHolder}</span>
        </button>
      </DialogTrigger>

      <DialogContent
        overlayClassName="backdrop-blur-sm"
        className="sm:max-w-2xl max-h-[85vh] p-0 gap-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>

        <div className="p-3 pr-12 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <Input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeHolder}
              className="pl-10 w-full h-11 text-base"
            />
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto">
          {!hasQuery ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">{hint}</p>
            </div>
          ) : isPending ? (
            <NavbarContentSkeleton />
          ) : total === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No results found for{" "}
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {query}
                </span>
              </p>
            </div>
          ) : role === "admin" ? (
            <AdminSearchView results={results} />
          ) : role === "doctor" ? (
            <DoctorSearchView results={results} />
          ) : (
            <PatientSearchView results={results} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
