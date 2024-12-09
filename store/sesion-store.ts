import { atomWithStorage } from "jotai/utils";

interface User {
  idUsuario: number;
  email: string;
  rol: number;
  iat: number;
  exp: number;
  token: string;
  refreshToken: string;
}

const cookieStorage = {
  getItem(key: string, initialValue: any) {
    //+
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === key) {
        return JSON.parse(value);
      }
    }
    return initialValue;
  },
  setItem(key: string, value: any) {
    const expires = new Date(Date.now() + 3600000); // 1 hour expiration
    document.cookie = `${key}=${JSON.stringify(
      value
    )}; expires=${expires.toUTCString()}; path=/`;
  },
  removeItem(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
};

export const userAtom = atomWithStorage<User | null>(
  "user",
  null,
  cookieStorage
);
