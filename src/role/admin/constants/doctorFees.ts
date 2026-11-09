import { MESSAGES } from "@/role/admin/constants/messages";
import { DoctorFeesValidation } from "@/role/admin/types/doctorFees";

export const DOCTOR_FEES_VALIDATION: DoctorFeesValidation = {
  minPrice: 10,
  priceLowMessage: MESSAGES.clinicSettings.doctorSpecialties.priceLow,
};
