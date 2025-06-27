"use client";

import dynamic from "next/dynamic";


const WorkoutPanel = dynamic(() => import("./WorkoutPanelInner"), { ssr: false });

export default WorkoutPanel;
