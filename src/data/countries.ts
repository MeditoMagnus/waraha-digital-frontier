
// Data structure for countries with dialing codes
export interface Country {
  name: string;
  code: string;
  dialCode: string;
}

export const countries: Country[] = [
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "Spain", code: "ES", dialCode: "+34" },
  { name: "Italy", code: "IT", dialCode: "+39" },
  { name: "Japan", code: "JP", dialCode: "+81" },
  { name: "China", code: "CN", dialCode: "+86" },
  { name: "Brazil", code: "BR", dialCode: "+55" },
  { name: "Mexico", code: "MX", dialCode: "+52" },
  { name: "Singapore", code: "SG", dialCode: "+65" }
];
