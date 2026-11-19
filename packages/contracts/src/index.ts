export const CASE_STATES = [
  "PENDING", "VALIDATING", "READY", "IN_PROGRESS",
  "WAITING_HUMAN", "RECONCILING", "NO_AVAILABILITY",
  "CONFIRMED", "CANCELLED", "FAILED"
] as const;
export type CaseState = (typeof CASE_STATES)[number];
export type HumanTask = {
  id: string;
  caseId: string;
  reason: "CAPTCHA" | "OFFICIAL_CONFIRMATION" | "SESSION_EXPIRED" | "OTHER";
  status: "OPEN" | "COMPLETED" | "EXPIRED";
  createdAt: string;
};
