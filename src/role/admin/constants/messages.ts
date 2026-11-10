export const MESSAGES = {
  profile: {
    saved: "Profile saved successfully.",
  },
  security: {
    passwordUpdated: "Password updated successfully.",
  },
  clinicSettings: {
    doctorSpecialties: {
      success: "Doctor specialties saved successfully.",
      error: "Failed to save doctor specialties.",
      completeAdd: "Please complete all doctor details before saving.",
      priceLow: "Please enter a valid consultation fee greater than $10.",
    },
    workingDays: {
      success: "Clinic settings saved successfully.",
    },
    clinicInfo: {
      success: "Clinic settings saved successfully.",
    },
  },
} as const;
