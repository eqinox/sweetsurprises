import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(
  error: unknown,
  fallback = "Неизвестна грешка"
): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    // Narrow to record
    const e = error as Record<string, unknown>;

    if (typeof e.note === "string") {
      return e.note;
    }

    if (typeof e.message === "string") {
      return e.message;
    }
  }

  return fallback;
}
