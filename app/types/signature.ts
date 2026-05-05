export interface SignatureData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  photoUrl: string
  linkedinUrl: string
  githubUrl: string
  whatsappUrl: string
  calendlyUrl: string
  portfolioUrl: string
  availability: string
  availabilityHours: string
  companyLogoUrl: string
  primaryColor: string
  secondaryColor: string
  templateId: string
}

export interface SignatureProfile {
  id: string
  name: string
  data: SignatureData
  createdAt: string
  updatedAt: string
}

export interface UserAccount {
  email: string
  name: string
  plan: 'free' | 'premium'
}

export interface TemplateInfo {
  id: string
  name: string
  description: string
  premium: boolean
  preview: string
}

export const DEFAULT_SIGNATURE: SignatureData = {
  name: 'João Silva',
  title: 'Desenvolvedor Full Stack',
  email: 'joao@exemplo.com',
  phone: '+55 11 99999-9999',
  location: 'São Paulo, Brasil',
  photoUrl: '',
  linkedinUrl: 'https://linkedin.com/in/joaosilva',
  githubUrl: 'https://github.com/joaosilva',
  whatsappUrl: 'https://wa.me/5511999999999',
  calendlyUrl: '',
  portfolioUrl: '',
  availability: 'Disponível',
  availabilityHours: 'Seg-Sex, 9h-18h',
  companyLogoUrl: '',
  primaryColor: '#6C3CE0',
  secondaryColor: '#2ABFBF',
  templateId: 'modern',
}
