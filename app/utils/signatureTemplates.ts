import type { SignatureData, TemplateInfo } from "~/types/signature";

export const TEMPLATES: TemplateInfo[] = [
  {
    id: "modern",
    name: "Moderno",
    description: "Layout limpo com gradiente lateral",
    premium: false,
    preview: "🎨",
  },
  {
    id: "classic",
    name: "Clássico",
    description: "Estilo corporativo tradicional",
    premium: false,
    preview: "📋",
  },
  {
    id: "minimal",
    name: "Minimalista",
    description: "Foco no essencial, sem distrações",
    premium: true,
    preview: "✨",
  },
  {
    id: "bold",
    name: "Ousado",
    description: "Cores vibrantes e tipografia forte",
    premium: true,
    preview: "🔥",
  },
  {
    id: "elegant",
    name: "Elegante",
    description: "Sofisticado com detalhes refinados",
    premium: true,
    preview: "💎",
  },
  {
    id: "creative",
    name: "Criativo",
    description: "Layout assimétrico e moderno",
    premium: true,
    preview: "🚀",
  },
];

function socialIcon(
  url: string | undefined,
  label: string,
  color: string,
): string {
  if (!url) return "";
  return `<a href="${url}" style="color:${color};text-decoration:none;margin-right:8px;font-size:13px;" target="_blank">${label}</a>`;
}

function safeSocialIcon(
  url: string | undefined,
  label: string,
  color: string,
): string {
  if (!url) return "";
  return socialIcon(url, label, color);
}

function qrCell(
  whatsappUrl: string | undefined,
  qrDataUrl: string | undefined,
): string {
  if (!whatsappUrl || !qrDataUrl) return "";
  return `<td style="vertical-align:top;padding-left:16px;">
    <img src="${qrDataUrl}" alt="QR Code" width="80" height="80" style="border-radius:6px;" />
  </td>`;
}

export function renderModern(data: SignatureData, qrDataUrl?: string): string {
  const {
    name,
    title,
    email,
    phone,
    location,
    photoUrl,
    linkedinUrl,
    githubUrl,
    whatsappUrl,
    calendlyUrl,
    portfolioUrl,
    availability,
    availabilityHours,
    companyLogoUrl,
    primaryColor,
    secondaryColor,
  } = data;
  return `<table cellpadding="0" cellspacing="0" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:#333;max-width:600px;">
    <tr>
      <td style="border-left:4px solid ${primaryColor};padding:16px 20px;">
        <table cellpadding="0" cellspacing="0"><tr>
          ${photoUrl ? `<td style="vertical-align:top;padding-right:16px;"><img src="${photoUrl}" alt="${name}" width="80" height="80" style="border-radius:50%;object-fit:cover;" /></td>` : ""}
          <td style="vertical-align:top;">
            <strong style="font-size:18px;color:${primaryColor};">${name}</strong><br/>
            <span style="color:${secondaryColor};font-size:13px;">${title}</span><br/>
            <span style="font-size:12px;margin-top:6px;display:inline-block;">
              ${email ? `✉️ <a href="mailto:${email}" style="color:#333;text-decoration:none;">${email}</a><br/>` : ""}
              ${phone ? `📞 ${phone}<br/>` : ""}
              ${location ? `📍 ${location}<br/>` : ""}
            </span>
            <div style="margin-top:8px;">
              ${safeSocialIcon(linkedinUrl, "LinkedIn", "primaryColor")}
              ${safeSocialIcon(githubUrl, "GitHub", "primaryColor")}
              ${safeSocialIcon(whatsappUrl, "WhatsApp", "primaryColor")}
              ${safeSocialIcon(portfolioUrl, "Portfólio", "primaryColor")}
            </div>
            ${calendlyUrl ? `<div style="margin-top:8px;"><a href="${calendlyUrl}" style="background:${primaryColor};color:#fff;padding:4px 12px;border-radius:4px;text-decoration:none;font-size:12px;">📅 Agendar reunião</a></div>` : ""}
            ${availability ? `<div style="margin-top:8px;font-size:11px;color:${secondaryColor};">● ${availability}${availabilityHours ? ` · ${availabilityHours}` : ""}</div>` : ""}
          </td>
          ${qrCell(whatsappUrl, qrDataUrl)}
        </tr></table>
        ${companyLogoUrl ? `<div style="margin-top:12px;"><img src="${companyLogoUrl}" alt="Logo" height="30" style="max-height:30px;" /></div>` : ""}
      </td>
    </tr>
  </table>`;
}

export function renderClassic(data: SignatureData, qrDataUrl?: string): string {
  const {
    name,
    title,
    email,
    phone,
    location,
    photoUrl,
    linkedinUrl,
    githubUrl,
    whatsappUrl,
    calendlyUrl,
    portfolioUrl,
    availability,
    availabilityHours,
    companyLogoUrl,
    primaryColor,
    secondaryColor,
  } = data;
  return `<table cellpadding="0" cellspacing="0" style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#333;max-width:600px;border-top:3px solid ${primaryColor};padding-top:12px;">
    <tr>
      ${photoUrl ? `<td style="vertical-align:top;padding-right:16px;"><img src="${photoUrl}" alt="${name}" width="70" height="70" style="border-radius:6px;object-fit:cover;" /></td>` : ""}
      <td style="vertical-align:top;">
        <strong style="font-size:16px;color:${primaryColor};">${name}</strong><br/>
        <em style="color:#666;font-size:13px;">${title}</em>
        <hr style="border:none;border-top:1px solid ${secondaryColor};margin:8px 0;" />
        <span style="font-size:12px;">
          ${email ? `${email} · ` : ""}${phone || ""}${location ? ` · ${location}` : ""}
        </span><br/>
        <div style="margin-top:6px;font-size:12px;">
          ${safeSocialIcon(linkedinUrl, "LinkedIn", "primaryColor")}
          ${safeSocialIcon(githubUrl, "GitHub", "primaryColor")}
          ${safeSocialIcon(whatsappUrl, "WhatsApp", "primaryColor")}
          ${safeSocialIcon(portfolioUrl, "Portfólio", "primaryColor")}
          ${calendlyUrl ? `<a href="${calendlyUrl}" style="color:${primaryColor};text-decoration:none;">📅 Agenda</a>` : ""}
        </div>
        ${availability ? `<div style="margin-top:6px;font-size:11px;color:${secondaryColor};">● ${availability}${availabilityHours ? ` · ${availabilityHours}` : ""}</div>` : ""}
      </td>
      ${qrCell(whatsappUrl, qrDataUrl)}
    </tr>
    ${companyLogoUrl ? `<tr><td colspan="3" style="padding-top:10px;"><img src="${companyLogoUrl}" alt="Logo" height="28" /></td></tr>` : ""}
  </table>`;
}

export function renderMinimal(data: SignatureData, qrDataUrl?: string): string {
  const {
    name,
    title,
    email,
    phone,
    primaryColor,
    secondaryColor,
    linkedinUrl,
    githubUrl,
    whatsappUrl,
  } = data;
  return `<table cellpadding="0" cellspacing="0" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#555;max-width:500px;">
    <tr><td>
      <strong style="font-size:15px;color:${primaryColor};letter-spacing:0.5px;">${name}</strong>
      <span style="color:${secondaryColor};"> · ${title}</span><br/>
      <span style="font-size:12px;">${email}${phone ? ` · ${phone}` : ""}</span><br/>
      <div style="margin-top:4px;font-size:12px;">
        ${safeSocialIcon(linkedinUrl, "in", "primaryColor")}
        ${safeSocialIcon(githubUrl, "gh", "primaryColor")}
        ${safeSocialIcon(whatsappUrl, "wa", "primaryColor")}
      </div>
    </td></tr>
  </table>`;
}

export function renderSignature(
  data: SignatureData,
  qrDataUrl?: string,
): string {
  switch (data.templateId) {
    case "classic":
      return renderClassic(data, qrDataUrl);
    case "minimal":
      return renderMinimal(data, qrDataUrl);
    case "modern":
    default:
      return renderModern(data, qrDataUrl);
  }
}
