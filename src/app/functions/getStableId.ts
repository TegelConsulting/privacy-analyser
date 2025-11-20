import { generateRandomDigits } from "./generateRandomDigits";

const STORAGE_KEY = "myStableId";

export function getStableId(length = 10): string {
    if (typeof window === "undefined") {
        return "";
    }

    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return existing; 

    const newId = generateRandomDigits(length);
    window.localStorage.setItem(STORAGE_KEY, newId);
    return newId;
}