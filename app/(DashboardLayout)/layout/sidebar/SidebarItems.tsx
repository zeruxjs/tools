"use client";
import React, { useState, useMemo, useEffect } from "react";
import Menuitems from "./NavigationItems";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  InputAdornment,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import Logo from "../shared/logo/Logo";
import {
  IconPoint,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconSettings,
  IconShieldLock,
} from '@tabler/icons-react';
import Link from "next/link";
import { usePathname } from "next/navigation";

import dynamic from 'next/dynamic';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote';

// Settings components with dynamic loading
const GeneralSettings = dynamic(() => import('./settings/General'), { loading: () => <Typography>Loading...</Typography> });
const ThemeSettings = dynamic(() => import('./settings/ThemePreferences'), { loading: () => <Typography>Loading...</Typography> });
const CookiesSettings = dynamic(() => import('./settings/Cookies'), { loading: () => <Typography>Loading...</Typography> });

const SettingsComponents: Record<string, React.ComponentType> = {
  "General": GeneralSettings,
  "Theme": ThemeSettings,
  "Cookies": CookiesSettings,
  "User": () => <Box sx={{ p: 4, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: '15px', border: '1px dashed', borderColor: 'divider', textAlign: 'center' }}><Typography color="text.secondary">User settings component coming soon...</Typography></Box>,
  "Export": () => <Box sx={{ p: 4, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: '15px', border: '1px dashed', borderColor: 'divider', textAlign: 'center' }}><Typography color="text.secondary">Export settings component coming soon...</Typography></Box>,
  "Import": () => <Box sx={{ p: 4, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: '15px', border: '1px dashed', borderColor: 'divider', textAlign: 'center' }}><Typography color="text.secondary">Import settings component coming soon...</Typography></Box>,
};

interface MdxContent {
  source: MDXRemoteProps;
  frontmatter: Record<string, any>;
}

interface TermTab {
  id: string;
  label: string;
  content: MdxContent | null;
}

const SidebarItems = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const pathDirect = pathname;

  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTermsPrivacyOpen, setIsTermsPrivacyOpen] = useState(false);
  const [settingTab, setSettingTab] = useState("General");
  const [termsTab, setTermsTab] = useState(0);

  const [settingsOptions] = useState<string[]>(Object.keys(SettingsComponents));
  const [termsTabs, setTermsTabs] = useState<TermTab[]>([
    { id: 'terms', label: 'Terms', content: null },
    { id: 'privacy', label: 'Privacy', content: null },
    { id: 'tags', label: 'Tags', content: null },
    { id: 'services', label: 'Services', content: null },
  ]);

  const [loadingTabs, setLoadingTabs] = useState<Record<string, boolean>>({});

  const fetchLegalContent = async (id: string) => {
    // If already has content or is loading, skip
    const tabIndex = termsTabs.findIndex(t => t.id === id);
    if (termsTabs[tabIndex]?.content || loadingTabs[id]) return;

    setLoadingTabs(prev => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`/api/content?type=legal&file=${id}`);
      const data = await res.json();
      setTermsTabs(prev => {
        const next = [...prev];
        const idx = next.findIndex(t => t.id === id);
        if (idx !== -1) {
          next[idx] = { ...next[idx], content: data };
        }
        return next;
      });
    } catch (err) {
      console.error(`Failed to fetch ${id} content:`, err);
    } finally {
      setLoadingTabs(prev => ({ ...prev, [id]: false }));
    }
  };

  // Fetch when opening dialog or pre-loading first item
  useEffect(() => {
    if (isTermsPrivacyOpen) {
      const activeTabId = termsTabs[termsTab]?.id;
      if (activeTabId) fetchLegalContent(activeTabId);
    }
  }, [isTermsPrivacyOpen, termsTab, termsTabs]);

  // Get current active settings component
  const ActiveSettingsComponent = SettingsComponents[settingTab] || (() => <Typography>Select a setting</Typography>);

  // Persistence: Load from localStorage or set defaults based on path
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-open-items");
    const initialOpen: Record<string, boolean> = saved ? JSON.parse(saved) : {};

    const findActiveParent = (items: any[]) => {
      items.forEach((item: any) => {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child: any) => child.href === pathDirect
          );
          if (hasActiveChild) {
            initialOpen[item.id] = true;
          }
          findActiveParent(item.children);
        }
      });
    };

    findActiveParent(Menuitems);
    setOpenItems(initialOpen);
  }, [pathDirect]);

  // Persistence: Save to localStorage when openItems change
  useEffect(() => {
    if (Object.keys(openItems).length > 0) {
      localStorage.setItem("sidebar-open-items", JSON.stringify(openItems));
    }
  }, [openItems]);

  const handleToggle = (id: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAnyMenuOpen = useMemo(() => {
    return Object.values(openItems).some((v) => v === true);
  }, [openItems]);

  const handleToggleAll = () => {
    if (isAnyMenuOpen) {
      setOpenItems({});
      localStorage.removeItem("sidebar-open-items");
    } else {
      const allOpen: Record<string, boolean> = {};
      const traverse = (items: any[]) => {
        items.forEach((item: any) => {
          if (item.children) {
            allOpen[item.id] = true;
            traverse(item.children);
          }
        });
      };
      traverse(Menuitems);
      setOpenItems(allOpen);
    }
  };

  // Filter items based on search term (Recursive)
  const filteredItems = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();

    // Special case for Dashboard: don't include it in main list if we render it as fixed
    const mainItems = Menuitems.slice(1);

    const matchesSearch = (item: any): boolean => {
      if (!lowerSearch) return true;
      const titleMatches = item.title?.toLowerCase().includes(lowerSearch);
      if (titleMatches) return true;
      if (item.children) {
        return item.children.some((child: any) => matchesSearch(child));
      }
      return false;
    };

    const filterFn = (items: any[]): any[] => {
      return items.reduce((acc: any[], item: any) => {
        if (item.navlabel) {
          const itemIndex = Menuitems.indexOf(item);
          const sectionItems = [];
          for (let i = itemIndex + 1; i < Menuitems.length; i++) {
            if (Menuitems[i].navlabel) break;
            sectionItems.push(Menuitems[i]);
          }
          if (sectionItems.some((it) => matchesSearch(it))) {
            acc.push(item);
          }
          return acc;
        }

        if (matchesSearch(item)) {
          if (item.children) {
            acc.push({ ...item, children: filterFn(item.children) });
          } else {
            acc.push(item);
          }
        }
        return acc;
      }, []);
    };
    return filterFn(mainItems);
  }, [searchTerm]);

  const renderMenuItems = (items: any[], depth = 0) => {
    return items.map((item: any) => {
      if (item.divider) {
        return <Divider key={item.id} sx={{ my: 1.5, mx: 2, borderColor: 'rgba(0,0,0,0.05)' }} />;
      }

      if (item.navlabel) {
        return (
          <Typography
            key={item.subheader}
            variant="caption"
            sx={{
              fontWeight: "700",
              marginTop: depth === 0 ? "24px" : "8px",
              padding: "0 24px 8px",
              textTransform: "uppercase",
              display: "block",
              color: "text.secondary",
              letterSpacing: '0.5px'
            }}
          >
            {item.subheader}
          </Typography>
        );
      }

      const Icon = item.icon ? item.icon : IconPoint;
      const itemIcon = <Icon stroke={1.5} size="1.2rem" />;
      const isSelected = pathDirect === item?.href;
      const isOpen = openItems[item.id] || false;
      const hasChildren = item.children && item.children.length > 0;
      const isExternal = item.href?.startsWith('http');

      return (
        <Box key={item.id} sx={{ px: depth > 0 ? 0 : 2, mb: 0.5 }}>
          {hasChildren ? (
            < >
              <ListItemButton
                onClick={(e) => handleToggle(item.id, e)}
                sx={{
                  borderRadius: "8px",
                  mb: "2px",
                  padding: depth > 0 ? `8px 16px 8px ${32 + (depth * 16)}px` : "10px 16px",
                  backgroundColor: isSelected ? `${theme.palette.primary.main}15` : "transparent",
                  color: isSelected ? "primary.main" : "text.secondary",
                  transition: 'all 0.2s ease',
                  "&:hover": {
                    backgroundColor: isSelected ? `${theme.palette.primary.main}25` : "rgba(0,0,0,0.04)",
                    color: 'primary.main'
                  },
                }}
              >
                {depth === 0 && <ListItemIcon sx={{ minWidth: "36px", color: "inherit" }}>{itemIcon}</ListItemIcon>}
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{ fontSize: "14px", fontWeight: isSelected ? "600" : "500" }}
                />
                {isOpen ? <IconChevronUp size="1rem" /> : <IconChevronDown size="1rem" />}
              </ListItemButton>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ listStyle: 'none' }}>
                  {renderMenuItems(item.children, depth + 1)}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItemButton
              component={isExternal ? 'a' : Link}
              href={item.href || "#"}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              selected={isSelected}
              sx={{
                borderRadius: "8px",
                mb: "2px",
                padding: depth > 0 ? `8px 16px 8px ${32 + (depth * 16)}px` : "10px 16px",
                transition: 'all 0.2s ease',
                "&.Mui-selected": {
                  backgroundColor: `${theme.palette.primary.main}15`,
                  color: "primary.main",
                  "&:hover": { backgroundColor: `${theme.palette.primary.main}25` }
                },
                "&:hover": {
                  backgroundColor: isSelected ? `${theme.palette.primary.main}25` : "rgba(0,0,0,0.04)",
                  color: 'primary.main'
                },
              }}
            >
              {depth === 0 && <ListItemIcon sx={{ minWidth: "36px", color: "inherit" }}>{itemIcon}</ListItemIcon>}
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontSize: "14px", fontWeight: isSelected ? "600" : "500" }}
              />
            </ListItemButton>
          )}
        </Box>
      );
    });
  };

  const dashboardItem = Menuitems[0];
  const DashboardIcon = dashboardItem?.icon;
  const isDashboardVisible =
    dashboardItem &&
    (!searchTerm || dashboardItem.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: 'background.paper' }}>
      {/* Fixed Top: Logo, Toggle, Dashboard & Search */}
      <Box sx={{ flexShrink: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} sx={{ height: "70px" }}>
          <Logo />
          <IconButton size="small" onClick={handleToggleAll} title={isAnyMenuOpen ? "Collapse All" : "Expand All"} sx={{ bgcolor: 'rgba(0,0,0,0.03)' }}>
            {isAnyMenuOpen ? <IconArrowsMinimize size="18" stroke={1.5} /> : <IconArrowsMaximize size="18" stroke={1.5} />}
          </IconButton>
        </Stack>

        {isDashboardVisible && dashboardItem && (
          <Box sx={{ px: 2, mb: 1 }}>
            <ListItemButton
              component={Link}
              href={dashboardItem.href || "/"}
              selected={pathDirect === dashboardItem.href}
              sx={{
                borderRadius: "8px",
                padding: "10px 16px",
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: `${theme.palette.primary.main}15`,
                  color: "primary.main",
                  "&:hover": { backgroundColor: `${theme.palette.primary.main}25` }
                },
                "&:hover": { color: "primary.main", backgroundColor: "rgba(0,0,0,0.04)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: "36px", color: "inherit" }}>
                {DashboardIcon && <DashboardIcon stroke={1.5} size="1.2rem" />}
              </ListItemIcon>
              <ListItemText
                primary={dashboardItem.title}
                primaryTypographyProps={{ fontSize: "14px", fontWeight: pathDirect === dashboardItem.href ? "600" : "500" }}
              />
            </ListItemButton>
          </Box>
        )}

        <Box px={2} mb={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                bgcolor: 'rgba(0,0,0,0.02)'
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size="18" stroke={1.5} />
                  </InputAdornment>
                ),
              }
            }}
          />
        </Box>
      </Box>

      {/* Scrollable: Other Menu Items */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 0, py: 1 }}>
        <List component="nav" sx={{ px: 0, listStyle: 'none', "& ul": { listStyle: 'none' }, "& li": { listStyle: 'none' }, "& .MuiListItemIcon-root": { minWidth: "36px" } }}>
          {renderMenuItems(filteredItems)}
        </List>
      </Box>

      {/* Fixed Bottom: Settings & Footer */}
      <Box sx={{ flexShrink: 0, pt: 1, pb: 2, px: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <List component="nav" disablePadding>
          <ListItemButton
            onClick={() => setIsSettingsOpen(true)}
            sx={{ borderRadius: "8px", mb: "4px", color: 'text.secondary', "&:hover": { color: 'primary.main', bgcolor: `${theme.palette.primary.main}10` } }}
          >
            <ListItemIcon sx={{ minWidth: "36px", color: 'inherit' }}><IconSettings stroke={1.5} size="1.2rem" /></ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: "14px", fontWeight: '500' }} />
          </ListItemButton>
          <ListItemButton
            onClick={() => setIsTermsPrivacyOpen(true)}
            onMouseEnter={() => fetchLegalContent('terms')}
            sx={{ borderRadius: "8px", color: 'text.secondary', "&:hover": { color: 'primary.main', bgcolor: `${theme.palette.primary.main}10` } }}
          >
            <ListItemIcon sx={{ minWidth: "36px", color: 'inherit' }}><IconShieldLock stroke={1.5} size="1.2rem" /></ListItemIcon>
            <ListItemText primary="Terms & Privacy" primaryTypographyProps={{ fontSize: "14px", fontWeight: '500' }} />
          </ListItemButton>
        </List>
        <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 2, color: "text.secondary", fontSize: '11px', fontWeight: '500' }}>
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_COMPANY_NAME || "Company Name"}
        </Typography>
      </Box>

      {/* Settings Dialog */}
      <Dialog 
        open={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        maxWidth="md" 
        fullWidth 
        PaperProps={{ 
          sx: { 
            borderRadius: '15px', 
            minHeight: '600px',
            width: '900px' // Fixed width to prevent jumping between tabs
          } 
        }}
      >
        <DialogTitle sx={{ fontWeight: '700', borderBottom: '1px solid', borderColor: 'divider' }}>Settings</DialogTitle>
        <DialogContent sx={{ display: 'flex', minHeight: '400px', p: 0 }}>
          <Box sx={{ width: '220px', borderRight: 1, borderColor: 'divider', bgcolor: 'rgba(0,0,0,0.01)' }}>
            <List sx={{ py: 2 }}>
              {settingsOptions.map((opt) => (
                <ListItemButton
                  key={opt}
                  selected={settingTab === opt}
                  onClick={() => setSettingTab(opt)}
                  sx={{
                    mx: 1.5,
                    borderRadius: '10px',
                    mb: 0.5,
                    "&.Mui-selected": { bgcolor: 'primary.main', color: 'white', "&:hover": { bgcolor: 'primary.main' } }
                  }}
                >
                  <ListItemText primary={opt} primaryTypographyProps={{ fontWeight: settingTab === opt ? '600' : '500' }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box sx={{ flexGrow: 1, pt: 2, px: 3, pb: 3, overflowY: 'auto' }}>
            <ActiveSettingsComponent />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Terms & Privacy Dialog */}
      <Dialog 
        open={isTermsPrivacyOpen} 
        onClose={() => setIsTermsPrivacyOpen(false)} 
        maxWidth="md" 
        fullWidth 
        PaperProps={{ 
          sx: { 
            borderRadius: '15px', 
            minHeight: '600px',
            width: '900px' // Fixed width to prevent jumping between tabs
          } 
        }}
      >
        <DialogTitle sx={{ fontWeight: '700' }}>Legal & Documents</DialogTitle>
        <DialogContent sx={{ p: 0, minHeight: '500px' }}>
          <Tabs
            value={termsTab}
            onChange={(_, val) => setTermsTab(val)}
            sx={{
              px: 2,
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { fontWeight: '600', textTransform: 'none', minWidth: '100px' }
            }}
          >
            {termsTabs.map((tab, idx) => (
              <Tab 
                key={tab.label} 
                label={tab.label} 
                id={`terms-tab-${idx}`} 
                onMouseEnter={() => fetchLegalContent(tab.id)}
              />
            ))}
          </Tabs>
          <Box sx={{ pt: 2, px: 3, pb: 3, maxHeight: '500px', overflowY: 'auto' }}>
            <Box className="mdx-content" sx={{ color: 'text.secondary', lineHeight: '1.7' }}>
              {termsTabs[termsTab]?.content?.source ? (
                <MDXRemote {...termsTabs[termsTab].content.source} />
              ) : (
                <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: '15px', border: '1px dashed', borderColor: 'divider' }}>
                  <Typography color="text.secondary">
                    {loadingTabs[termsTabs[termsTab]?.id] ? "Loading document..." : "Preparing content..."}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SidebarItems;
