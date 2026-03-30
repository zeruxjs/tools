import { Box } from "@mui/material";
import React from "react";
import LayoutStructure from "@/app/(DashboardLayout)/layout/shared/LayoutStructure";

// This is now a Server Component
export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutStructure>
      <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
    </LayoutStructure>
  );
}
