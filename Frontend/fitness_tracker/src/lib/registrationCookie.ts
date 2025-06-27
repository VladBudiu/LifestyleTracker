// lib/registrationCookie.ts
import Cookies from "js-cookie";

const COOKIE = "signup_draft";
const TTL   = 60 * 60 * 24;      // 24 h

export const readDraft = () =>
  JSON.parse(Cookies.get(COOKIE) ?? "{}");

export const writeDraft = (delta: Partial<Draft>) => {
  Cookies.set(
    COOKIE,
    JSON.stringify({ ...readDraft(), ...delta }),
    { expires: TTL / 86400, sameSite: "lax", secure: true }
  );
};

export const clearDraft = () => Cookies.remove(COOKIE);

export type Draft = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  date_of_birth?: string;
  sign_up_date?: string;
  username?: string;
  weightGoal?: string;
  activityLevel?: string;
  height?: number;
  weight?: number;
  weightTarget?: number;
  weeklyGoal?: number;
};
