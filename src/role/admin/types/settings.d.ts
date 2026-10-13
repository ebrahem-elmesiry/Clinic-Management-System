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
  specialty_id: string;
  doctor_id: string;
}

export interface OriginalValues {
  specialty_id: string;
  doctor_name: string;
  price: number;
}
