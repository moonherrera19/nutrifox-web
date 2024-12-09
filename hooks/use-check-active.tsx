import { usePathname } from "next/navigation";

export default function useCheckActive() {
  const pathname = usePathname();

  const checkActive = (route: string): boolean => {
    if (route === "/aplicacion") return true;

    return pathname.startsWith(route);
  };

  return { checkActive };
}
