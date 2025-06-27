export const fetchWithAutoRefresh = async (url: string, options: RequestInit = {}) => {
  let res = await fetch(url, { ...options, credentials: "include" });
  console.log("Initial fetch response:", res);
  if (res.status === 401) {
    console.log("Access token expired, trying to refresh...");
    const refreshRes = await fetch("http://localhost:8080/auth/refresh", {
      method: "POST",
      credentials: "include",
    });


    if (refreshRes.ok) {
      console.log("Refreshed token successfully, retrying original request");
      res = await fetch(url, { ...options, credentials: "include" });
    } else {
      console.warn("Refresh failed, redirecting to login");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return null;
    }
  }

  return res;
};
