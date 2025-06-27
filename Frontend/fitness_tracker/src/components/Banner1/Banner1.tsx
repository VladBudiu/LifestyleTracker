"use client";

import React from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import { AiOutlineEye } from "react-icons/ai";
import "./Banner1.css";
import { useRouter } from "next/navigation";
import { fetchWithAutoRefresh } from "@/lib/fetchWithAutoRefresh";

type Metric = {
  name: string;
  value: number;
  unit: string;
  goal: number;
  goalUnit: string;
  start?: number;          
};





const Banner1 = () => {
  const [data, setData] = React.useState<any[]>([]);
  const hasFetchedRef = React.useRef(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    

    const fetchData = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          console.warn("User not found in localStorage");
          setIsAuthorized(false);
          setIsLoading(false);
          router.push("/");
          return;
        }

        const user = JSON.parse(userString);
        if (!user?.userId) {
          console.warn("Invalid user object");
          setIsAuthorized(false);
          setIsLoading(false);
          router.push("/");
          return;
        }

        const response = await fetchWithAutoRefresh(`http://localhost:8080/api/metrics/${user.userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.warn("Unauthorized");
            setIsAuthorized(false);
            setIsLoading(false);
            router.push("/");
            return;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        setData(data);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsAuthorized(false);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateProgress = (item: Metric) => {
  const { value: current, goal, start } = item;

  if (item.name === "Weight") {
    
    const baseline = start ?? current;

    const distance = Math.abs(goal - baseline);
    if (distance === 0) return 100;

    const progress = Math.abs(current - baseline) / distance * 100;
    return Math.min(100, Math.round(progress));
  }

  
  if (goal === 0) return current === 0 ? 100 : 0;
  return Math.min(100, Math.round((current / goal) * 100));
};

  if (isLoading || !isAuthorized) {
    return <div className="meters">Checking authorization...</div>;
  }

  return (
    <div className="meters">
      {data.length > 0 &&
        data.map((item, index) => {
          const progress = calculateProgress(item);
          return (
            <div className="card" key={index}>
              <div className="card-header">
                <div className="card-header-box">
                  <div className="card-header-box-name">{item.name}</div>
                  <div className="card-header-box-value">
                    {item.value} {item.unit}
                  </div>
                </div>
                <div className="card-header-box">
                  <div className="card-header-box-name">Target</div>
                  <div className="card-header-box-value">
                    {item.goal} {item.goalUnit}
                  </div>
                </div>
              </div>

              <CircularProgress
                color="neutral"
                determinate
                variant="solid"
                size="lg"
                value={progress}
              >
                <span className="textincircle">{progress}%</span>
              </CircularProgress>

              <button
                onClick={() => {
                  window.location.href = `/history`;
                }}
              >
                Show Report <AiOutlineEye />
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Banner1;