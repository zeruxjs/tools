"use client";
import React from "react";
import { Box, Drawer, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const theme = useTheme();

  const sidebarWidth = "270px";

  const drawerPaperStyles = {
    boxSizing: "border-box",
    width: sidebarWidth,
    borderRight: '1px solid rgba(0,0,0,0.1)',
  };

  return (
    <Box component="nav" aria-label="sidebar" sx={{ display: 'flex' }}>
      {/* Desktop Sidebar (Permanent) */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          slotProps={{
            paper: {
              sx: drawerPaperStyles,
            }
          }}
        >
          <Box sx={{ height: "100%" }}>
            <SidebarItems />
          </Box>
        </Drawer>
      </Box>

      {/* Mobile Sidebar (Temporary) */}
      <Drawer
        anchor="left"
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        variant="temporary"
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxShadow: (theme) => theme.shadows[8],
            ...drawerPaperStyles,
          },
        }}
      >
        <Box sx={{ height: "100%" }}>
          <SidebarItems />
        </Box>
      </Drawer>
    </Box>
  );
};

export default MSidebar;
