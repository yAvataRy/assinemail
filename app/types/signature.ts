export interface TemplateInfo {
  id: string;
  name: string;
  description?: string;
  premium?: boolean;
  preview?: string;
}

export interface SignatureData {
  name: string;
  role?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  photoUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  whatsappUrl?: string;
  calendlyUrl?: string;
  portfolioUrl?: string;
  availability?: string;
  availabilityHours?: string;
  companyLogoUrl?: string;
  company?: string;
  website?: string;
  template?: string;
  primaryColor?: string;
  secondaryColor?: string;
  templateId?: string;
}

export interface SignatureProfile {
  id: string;
  name: string;
  data: SignatureData;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAccount {
  id?: string;
  name: string;
  email: string;
  plan?: "free" | "premium";
}

export const DEFAULT_SIGNATURE: SignatureData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  photoUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  whatsappUrl: "",
  calendlyUrl: "",
  portfolioUrl: "",
  availability: "",
  availabilityHours: "",
  companyLogoUrl: "",
  primaryColor: "#1f2937",
  secondaryColor: "#6b7280",
  templateId: "modern",
};
