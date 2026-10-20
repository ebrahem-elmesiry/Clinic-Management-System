"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import WrapperComponent from "@/shared/components/WrapperComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { VisitStatusValue } from "../../types/type";

const CANCEL_REASONS = ["Patient did not attend", "Doctor unavailable"];

interface VisitStatusProps {
  status: VisitStatusValue;
  onStatusChange: (status: VisitStatusValue) => void;
  cancelReason: string;
  onCancelReasonChange: (reason: string) => void;
  cancelNote: string;
  onCancelNoteChange: (note: string) => void;
}

export default function VisitStatus({
  status,
  onStatusChange,
  cancelReason,
  onCancelReasonChange,
  cancelNote,
  onCancelNoteChange,
}: VisitStatusProps) {
  const [showCancel, setShowCancel] = useState(false);

  const confirmCancel = () => {
    onStatusChange("cancelled");
    setShowCancel(false);
  };

  const statusBadge =
    status === "cancelled" ? (
      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 text-xs rounded-full">
        Cancelled
      </span>
    ) : status === "completed" ? (
      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 text-xs rounded-full">
        Completed
      </span>
    ) : (
      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-500 text-xs rounded-full">
        Pending
      </span>
    );

  return (
    <WrapperComponent title="Visit Status" showButton Button={statusBadge}>
      {status === "cancelled" ? (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/50 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-900 dark:text-slate-100">
              Visit cancelled
            </p>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Reason: {cancelReason || "Not specified"}
            </p>
            {cancelNote && (
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Note: {cancelNote}
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-700">
            <div>
              <p className="text-sm text-gray-900 dark:text-slate-100">
                Cancel this visit
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Patient didn't attend, doctor unavailable, etc.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setShowCancel(!showCancel)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Visit
            </Button>
          </div>

          {showCancel && (
            <div className="mt-4 p-4 border border-red-200 rounded-lg space-y-4">
              <div>
                <Label>Reason for cancellation</Label>
                <Select value={cancelReason} onValueChange={onCancelReasonChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CANCEL_REASONS.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cancel-note">Additional note (optional)</Label>
                <textarea
                  id="cancel-note"
                  rows={2}
                  placeholder="Add details about the cancellation..."
                  value={cancelNote}
                  onChange={(e) => onCancelNoteChange(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={confirmCancel} variant={"destructive"}>
                  Confirm Cancellation
                </Button>
                <Button variant="outline" onClick={() => setShowCancel(false)}>
                  Keep Visit
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </WrapperComponent>
  );
}
