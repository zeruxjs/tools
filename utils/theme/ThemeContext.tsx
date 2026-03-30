"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { plus } from './DefaultColors';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface ThemeSettings {
  themeMode: ThemeMode;
  lightPrimaryColor: string;
  darkPrimaryColor: string;
  lightContrast: boolean;
  darkContrast: boolean;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateSettings: (newSettings: Partial<ThemeSettings>) => void;
  toggleThemeMode: () => void;
  currentMode: 'light' | 'dark';
}

const defaultSettings: ThemeSettings = {
  themeMode: 'system',
  lightPrimaryColor: '#5D87FF',
  darkPrimaryColor: '#5D87FF',
  lightContrast: false,
  darkContrast: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeSettings must be used within ThemeProvider");
  return context;
};

export const CustomThemeProvider = ({
  children,
  initialSettings,
  initialSystemMode = 'light'
}: {
  children: React.ReactNode;
  initialSettings: ThemeSettings;
  initialSystemMode?: 'light' | 'dark';
}) => {
  const [settings, setSettings] = useState<ThemeSettings>(initialSettings);
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(initialSystemMode);
  const [isMounted, setIsMounted] = useState(false);

  // Listen for system theme changes
  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialSystemMode = mediaQuery.matches ? 'dark' : 'light';
    setSystemMode(initialSystemMode);

    // Save system mode to cookie for server-side detection on next load
    Cookies.set('system_mode', initialSystemMode, { expires: 365, path: '/' });

    const handler = (e: MediaQueryListEvent) => {
      const newSystemMode = e.matches ? 'dark' : 'light';
      setSystemMode(newSystemMode);
      Cookies.set('system_mode', newSystemMode, { expires: 365, path: '/' });
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    // Store in cookie for 1 year
    Cookies.set('theme_settings', JSON.stringify(updated), { expires: 365, path: '/' });
  };

  const toggleThemeMode = () => {
    const modes: ThemeMode[] = ['system', 'light', 'dark'];
    const currentIndex = modes.indexOf(settings.themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    updateSettings({ themeMode: modes[nextIndex] });
  };

  const currentMode = settings.themeMode === 'system' ? systemMode : settings.themeMode;

  const theme = useMemo(() => {
    const isDark = currentMode === 'dark';
    const primaryColor = isDark ? settings.darkPrimaryColor : settings.lightPrimaryColor;
    const isHighContrast = isDark ? settings.darkContrast : settings.lightContrast;

    return createTheme({
      direction: "ltr",
      palette: {
        mode: currentMode,
        primary: {
          main: primaryColor,
          light: isDark ? primaryColor + '20' : primaryColor + '10', // Simplified for now
          dark: primaryColor,
        },
        background: {
          default: isDark ? (isHighContrast ? '#000000' : '#0d1117') : (isHighContrast ? '#f0f0f0' : '#ffffff'),
          paper: isDark ? (isHighContrast ? '#121212' : '#161b22') : (isHighContrast ? '#ffffff' : '#f8fafd'),
        },
        text: {
          primary: isDark ? '#c9d1d9' : '#2A3547',
          secondary: isDark ? '#8b949e' : '#5A6A85',
        },
        divider: isDark ? '#30363d' : '#e5eaef',
      },
      typography: {
        fontFamily: plus.style.fontFamily,
        h1: { fontWeight: 600, fontSize: "2.25rem", lineHeight: "2.75rem" },
        h2: { fontWeight: 600, fontSize: "1.875rem", lineHeight: "2.25rem" },
        h3: { fontWeight: 600, fontSize: "1.5rem", lineHeight: "1.75rem" },
        h4: { fontWeight: 600, fontSize: "1.3125rem", lineHeight: "1.6rem" },
        h5: { fontWeight: 600, fontSize: "1.125rem", lineHeight: "1.6rem" },
        h6: { fontWeight: 600, fontSize: "1rem", lineHeight: "1.2rem" },
        button: { textTransform: "none", fontWeight: 400 },
        body1: { fontSize: "0.875rem", fontWeight: 400, lineHeight: "1.334rem" },
        body2: { fontSize: "0.75rem", letterSpacing: "0rem", fontWeight: 400, lineHeight: "1rem" },
        subtitle1: { fontSize: "0.875rem", fontWeight: 400 },
        subtitle2: { fontSize: "0.875rem", fontWeight: 400 },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            "body": {
              backgroundColor: isDark ? (isHighContrast ? '#000000' : '#0d1117') : (isHighContrast ? '#f0f0f0' : '#ffffff'),
            },
            // Custom Scrollbar styling for better visibility in both modes
            '::-webkit-scrollbar': {
              width: '5px',
              height: '5px',
            },
            '::-webkit-scrollbar-button': {
              display: 'none',
            },
            '::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '::-webkit-scrollbar-thumb': {
              background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
              borderRadius: '10px',
              '&:hover': {
                background: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
              },
            },
            // Firefox support
            'html': {
              scrollbarWidth: 'thin',
              scrollbarColor: isDark
                ? 'rgba(255, 255, 255, 0.15) transparent'
                : 'rgba(0, 0, 0, 0.15) transparent',
            },
            ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
              boxShadow: isDark
                ? "rgba(0, 0, 0, 0.5) 0px 8px 24px"
                : "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: "7px",
              backgroundImage: 'none',
              border: isDark ? '1px solid #30363d' : '1px solid #e5eaef',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              boxShadow: 'none',
            }
          }
        }
      },
    });
  }, [currentMode, settings]);

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, toggleThemeMode, currentMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
