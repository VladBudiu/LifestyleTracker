"use client";

import dynamic from "next/dynamic";

/*   ⬇︎  This makes sure nothing is rendered on the server   */
const WorkoutPanel = dynamic(() => import("./WorkoutPanelInner"), { ssr: false });

export default WorkoutPanel;
