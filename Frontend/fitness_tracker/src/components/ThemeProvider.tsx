// src/components/ThemeProvider.tsx
"use client";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import theme from "@/theme/joyTheme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
