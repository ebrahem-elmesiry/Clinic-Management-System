export type TypeRow = "specialty_id" | "doctor_name" | "price";

export type DoctorFeesValidation = {
  minPrice: number;
  priceLowMessage: string;
};

interface doctorType {
  id: string;
  price: number;
  specialty_id: string;
}

export interface SpecialtyPrice extends doctorType {
  doctor_name: string;
  is_new?: boolean;
}
export interface DoctorFeeChange extends doctorType {
  doctor_name: string;
}

export interface OriginalValues {
  specialty_id: string;
  doctor_name: string;
  price: number;
}
