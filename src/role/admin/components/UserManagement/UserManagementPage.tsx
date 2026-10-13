"use client";

import PageTitleWithButton from "@/shared/components/page-title/PageTitleWithButton";
import TableSearch from "@/shared/components/TableSearch";
import StatisticsCard from "@/shared/components/StatisticsCard";
import UsersTable from "@/shared/components/Tables/UsersTable";
import AddNewUser from "@/role/admin/modals/AddNewUser/AddNewUser";
import ConfirmDeleteDialog from "@/shared/components/ConfirmDeleteDialog";
import { roleStats } from "../../constants";
import { Button } from "@/shared/components/ui/button";
import UserManagementHook from "../../hooks/UserManagementHook";

export default function UserManagementPage() {
  const {
    face,
    setFace,
    editingUser,
    handleSaveUser,
    setEditingUser,
    addUserOpen,
    setAddUserOpen,
    handleOpenChange,
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
  } = UserManagementHook();

  return (
    <div className="space-y-6">
      <PageTitleWithButton
        title="User Management"
        subtitle="Manage users, roles, and permissions"
        action={
          <AddNewUser
            open={addUserOpen}
            onOpenChange={handleOpenChange}
            editingUser={editingUser}
            onSaveUser={handleSaveUser}
            onClearEdit={() => setEditingUser(null)}
            face={face}
            setFace={setFace}
            setAddUserOpen={setAddUserOpen}
          />
        }
      />

      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleStats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-50">
            <TableSearch
              placeholder="Search users..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filterButtons.map((btn) => (
              <Button
                key={btn.role}
                onClick={() => setSelectedRole(btn.role)}
                variant={"ghost"}
                className={`${
                  searchParam === btn.role
                    ? "bg-blue-600 text-white hover:bg-blue-600! border-2 border-blue-600"
                    : "bg-transparent border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-700/70"
                }`}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-12 text-center">
          <p className="text-gray-900 dark:text-gray-100 font-medium">
            No results match your search
          </p>
          {searchQuery.trim() ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              We couldn&apos;t find anything for{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                &quot;{searchQuery.trim()}&quot;
              </span>
              . Try a different name, email or specialty.
            </p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              No users found for the selected filter. Try another role or clear
              filters.
            </p>
          )}
        </div>
      ) : (
        <UsersTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(o) => {
          setDeleteDialogOpen(o);
          if (!o) setPendingDelete(null);
        }}
        title={`Are you sure you want to delete ${pendingDelete?.name ?? "this user"}?`}
        description="If you delete this account it will be removed from our database forever and cannot be recovered. This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
