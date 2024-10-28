import { z } from "zod";

export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Title is required"),
  description: z.string(),
  issuer: z.string(),
  date: z.string(),
  category: z.string(),
  file: z.string(),
  order: z.number(),
});

export type Certificate = z.infer<typeof certificateSchema>;

const STORAGE_KEY = "certificates";

export const categories = [
  "Web Development",
  "Cloud Computing",
  "AI & ML",
  "Cybersecurity",
  "Data Science",
  "DevOps",
  "Mobile Development",
  "Other",
] as const;

export function getCertificates(): Certificate[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveCertificates(certificates: Certificate[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
}

export function addCertificate(certificate: Omit<Certificate, "id" | "order">) {
  const certificates = getCertificates();
  const newCertificate = {
    ...certificate,
    id: crypto.randomUUID(),
    order: certificates.length,
  };
  certificates.push(newCertificate);
  saveCertificates(certificates);
  return newCertificate;
}

export function updateCertificateOrder(certificates: Certificate[]) {
  saveCertificates(certificates);
}