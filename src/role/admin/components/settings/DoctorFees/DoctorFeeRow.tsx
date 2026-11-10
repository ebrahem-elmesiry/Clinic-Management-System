"use client";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Trash2, Pencil, X, Check } from "lucide-react";
import { SpecialtyPrice, TypeRow } from "@/role/admin/types/doctorFees";

type Option = { id: string; name: string };

export interface DoctorFeeRowProps {
  item: SpecialtyPrice;
  isEditing: boolean;
  specialties: Option[];
  doctors: Option[];
  onStartEditing: (id: string) => void;
  onCancelEditing: (id: string) => void;
  updateRow: (id: string, value: string, type: TypeRow) => void;
  onRemoveSpecialty: (id: string) => void;
  onAcceptNew: (id: string, row: SpecialtyPrice) => void;
}

export default function DoctorFeeRow({
  item,
  isEditing,
  specialties,
  doctors,
  onStartEditing,
  onCancelEditing,
  updateRow,
  onRemoveSpecialty,
  onAcceptNew,
}: DoctorFeeRowProps) {
  return (
    <div
      key={item.id}
      className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center border-t border-gray-100 dark:border-slate-700/50 py-2"
    >
      {isEditing ? (
        <>
          <Select
            value={item.specialty_id}
            onValueChange={(value) => updateRow(item.id, value, "specialty_id")}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={item.doctor_name}
            onValueChange={(value) => updateRow(item.id, value, "doctor_name")}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.name}>
                  {doc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            value={item.price}
            onChange={(e) => updateRow(item.id, e.target.value, "price")}
            className="h-9 w-28"
          />

          <div className="flex items-center justify-end gap-1">
            {item.is_new ? (
              <div className="flex items-center justify-end gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onAcceptNew(item.id, item)}
                  aria-label="Accept"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveSpecialty(item.id)}
                  aria-label="Delete row"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onAcceptNew(item.id, item)}
                  aria-label="Accept"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onCancelEditing(item.id)}
                  aria-label="Cancel edit"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Input
            readOnly
            value={
              specialties.find((s) => s.id === item.specialty_id)?.name ?? ""
            }
            className="h-9"
          />

          <Input readOnly value={item.doctor_name} className="h-9" />

          <Input readOnly value={`$${item.price}`} className="h-9 w-28" />

          <div className="flex items-center justify-end gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onStartEditing(item.id)}
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemoveSpecialty(item.id)}
              aria-label="Delete row"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
