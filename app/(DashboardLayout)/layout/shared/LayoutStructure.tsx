"use client";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function LayoutStructure({ children }: Props) {
  const [isSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Use a simple Box with sx instead of styled components to avoid hydration mismatch
  const sidebarWidth = "270px";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          zIndex: 1,
          backgroundColor: "transparent",
          width: {
            lg: `calc(100% - ${sidebarWidth})`,
            xs: '100%'
          }
        }}
      >
        {/* Header */}
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        
        {/* Page Content */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
            flexGrow: 1,
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
}
