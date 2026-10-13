"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { users } from "../constants";
import { UserRecord } from "../types/user-management";

export default function UserManagementHook() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [face, setFace] = useState<1 | 2>(1);
  const [usersList, setUsersList] = useState<UserRecord[]>(
    users as unknown as UserRecord[],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<UserRecord | null>(null);

  const searchParam = searchParams.get("search") || "all";
  function setSelectedRole(role: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (role === "all") {
      params.delete("search");
    } else {
      params.set("search", role);
    }
    router.replace(`${pathname}?${params}`, { scroll: false });
  }

  function handleEdit(user: UserRecord) {
    setEditingUser(user);
    setFace(2);
    setAddUserOpen(true);
  }

  const handleDelete = (id: string) => {
    const user = usersList.find((u) => u.id === id) ?? null;
    setPendingDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDelete) {
      setUsersList((prev) => prev.filter((u) => u.id !== pendingDelete.id));
    }
    setDeleteDialogOpen(false);
    setPendingDelete(null);
  };

  const handleSaveUser = (user: UserRecord) => {
    if (editingUser) {
      setUsersList((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsersList((prev) => [...prev, user]);
    }
    setEditingUser(null);
  };

  const handleOpenChange = (open: boolean) => {
    setAddUserOpen(open);
    if (!open) {
      setEditingUser(null);
      setFace(1);
    }
  };

  const filteredUsers = useMemo(() => {
    let list =
      searchParam === "all"
        ? usersList
        : usersList.filter((user) => user.role === searchParam);
    const q = searchQuery.trim().toLowerCase();

    if (q) {
      list = list.filter((user) => user.name.toLowerCase().includes(q));
    }
    return list;
  }, [searchParam, usersList, searchQuery]);

  const filterButtons = [
    { role: "all", label: "All Users" },
    { role: "doctor", label: "Doctors" },
    { role: "admin", label: "Admins" },
    { role: "patient", label: "Patients" },
  ];

  return {
    addUserOpen,
    handleOpenChange,
    editingUser,
    handleSaveUser,
    setEditingUser,
    face,
    setFace,
    setAddUserOpen,
    searchQuery,
    setSearchQuery,
    filterButtons,
    searchParam,
    setSelectedRole,
    filteredUsers,
    handleEdit,
    handleDelete,
    deleteDialogOpen,
    setDeleteDialogOpen,
    pendingDelete,
    setPendingDelete,
    confirmDelete,
  };
}
