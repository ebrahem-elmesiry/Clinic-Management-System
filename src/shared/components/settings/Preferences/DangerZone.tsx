import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";

export default function DangerZone() {
  function DeleteAccount() {}
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-red-200 dark:border-red-900/50 p-6">
      <h2 className="text-lg text-red-700 dark:text-red-400 mb-2">
        Danger Zone
      </h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
        These actions are permanent and cannot be undone.
      </p>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-950/50">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-sm text-red-800 dark:text-red-400/80">
                Delete Account
              </p>
              <p className="text-xs text-red-600 dark:text-red-400/80">
                Permanently remove your account and all data
              </p>
            </div>
          </div>
          <Button onClick={DeleteAccount} variant={"danger"}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
