"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./page.module.css";
import Banner1 from "@/components/Banner1/Banner1";
import Banner2 from "@/components/Banner2/Banner2";
import Banner3 from "@/components/Banner3/Banner3";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/index";
import { useRouter } from "next/navigation";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const checkAuth = async () => {
      const userString = localStorage.getItem("user");

      if (!userString) {
        console.warn("User not found in localStorage");
        // router.push("/login");
        return;
      }

      const user = JSON.parse(userString);
      if (!user?.userId) {
        console.warn("Invalid user object");
        router.push("/login");
        return;
      }

      try {
        console.log("🔐 Calling protected endpoint to check auth...");

        const res = await fetchWithAutoRefresh(`http://localhost:8080/api/metrics/${user.userId}`);

        if (!res || !res.ok) {
          console.warn("❌ Auth check failed or refresh failed");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        console.log("✅ Auth successful or refreshed");
        setIsLoading(false);
      } catch (err) {
        console.error("❌ Exception during auth check:", err);
        localStorage.removeItem("user");
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div className={styles.page}>Checking authorization...</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navbar />
        <Banner1 />
        <Banner2 />
        <Banner3 />
        <Footer />
      </main>
    </div>
  );
}
