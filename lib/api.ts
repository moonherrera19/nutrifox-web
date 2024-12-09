export default function useApi() {
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const cookie =
      ("; " + document.cookie)?.split(`; user=`)?.pop()?.split(";")[0] || "";

    const user = JSON.parse(cookie);
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${user?.token}`,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}${url}`, {
      ...options,
      headers,
    });

    return response;
  };

  return fetchWithAuth;
}
