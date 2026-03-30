"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid'; 
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { 
    IconSun, IconMoon, IconAdjustments, 
    IconCircleCheckFilled, IconDeviceDesktop 
} from '@tabler/icons-react';
import { useThemeSettings, ThemeMode } from '@/utils/theme/ThemeContext';

const colorOptions = [
    '#5D87FF', // Default Blue
    '#49BEFF', // Secondary Blue
    '#13DEB9', // Success Green
    '#FA896B', // Error Coral
    '#FFAE1F', // Warning Orange
    '#763EBD', // Purple
    '#202124', // Black
];

const ThemeSettings = () => {
    const { settings, updateSettings, currentMode } = useThemeSettings();

    const handleModeChange = (event: any) => {
        updateSettings({ themeMode: event.target.value as ThemeMode });
    };

    const handleColorChange = (mode: 'light' | 'dark', color: string) => {
        if (mode === 'light') {
            updateSettings({ lightPrimaryColor: color });
        } else {
            updateSettings({ darkPrimaryColor: color });
        }
    };

    const handleContrastChange = (mode: 'light' | 'dark') => {
        if (mode === 'light') {
            updateSettings({ lightContrast: !settings.lightContrast });
        } else {
            updateSettings({ darkContrast: !settings.darkContrast });
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Theme preferences</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Choose how Tools looks to you. Select a theme, or sync with your system.
            </Typography>

            {/* Theme Mode Selection */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Theme mode</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Select
                        size="small"
                        value={settings.themeMode}
                        onChange={handleModeChange}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="system">Sync with system</MenuItem>
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                    <Typography variant="caption" color="text.secondary">
                        Theme will match your system active settings
                    </Typography>
                </Stack>
            </Box>

            <Grid container spacing={3}>
                {/* Light Theme Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card 
                        sx={{ 
                            border: currentMode === 'light' ? '2px solid #5D87FF' : '1px solid',
                            borderColor: currentMode === 'light' ? 'primary.main' : 'divider',
                            position: 'relative',
                            bgcolor: '#ffffff',
                            color: '#2A3547'
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <IconSun size={18} />
                                    <Typography variant="subtitle1" fontWeight={600}>Light theme</Typography>
                                </Stack>
                                {currentMode === 'light' && (
                                    <Typography variant="caption" color="primary" sx={{ px: 1, py: 0.2, border: '1px solid', borderRadius: 4 }}>Active</Typography>
                                )}
                            </Stack>
                            
                            {/* Mockup Preview */}
                            <Box sx={{ 
                                height: 120, mb: 2, borderRadius: 1, border: '1px solid #e5eaef',
                                bgcolor: '#f8fafd', p: 1, display: 'flex', flexDirection: 'column', gap: 1
                            }}>
                                <Box sx={{ height: 10, width: '60%', bgcolor: '#e5eaef', borderRadius: 1 }} />
                                <Box sx={{ flexGrow: 1, bgcolor: settings.lightPrimaryColor, borderRadius: 1, opacity: 0.1 }} />
                                <Box sx={{ height: 10, width: settings.lightPrimaryColor, borderRadius: 1, bgcolor: settings.lightPrimaryColor }} />
                            </Box>

                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                Primary color for light mode
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {colorOptions.map(color => (
                                    <IconButton 
                                        key={color} 
                                        size="small" 
                                        onClick={() => handleColorChange('light', color)}
                                        sx={{ 
                                            width: 28, height: 28, bgcolor: color, 
                                            '&:hover': { bgcolor: color, opacity: 0.8 },
                                            border: settings.lightPrimaryColor === color ? '2px solid' : 'none',
                                            borderColor: 'text.primary'
                                        }}
                                    >
                                        {settings.lightPrimaryColor === color && <IconCircleCheckFilled size={14} color="#fff" />}
                                    </IconButton>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Dark Theme Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card 
                        sx={{ 
                            border: currentMode === 'dark' ? '2px solid #5D87FF' : '1px solid',
                            borderColor: currentMode === 'dark' ? 'primary.main' : 'divider',
                            bgcolor: '#0d1117',
                            color: '#c9d1d9'
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <IconMoon size={18} />
                                    <Typography variant="subtitle1" fontWeight={600}>Dark theme</Typography>
                                </Stack>
                                {currentMode === 'dark' && (
                                    <Typography variant="caption" color="primary" sx={{ px: 1, py: 0.2, border: '1px solid', borderRadius: 4 }}>Active</Typography>
                                )}
                            </Stack>
                            
                            {/* Mockup Preview */}
                            <Box sx={{ 
                                height: 120, mb: 2, borderRadius: 1, border: '1px solid #30363d',
                                bgcolor: '#161b22', p: 1, display: 'flex', flexDirection: 'column', gap: 1
                            }}>
                                <Box sx={{ height: 10, width: '60%', bgcolor: '#30363d', borderRadius: 1 }} />
                                <Box sx={{ flexGrow: 1, bgcolor: settings.darkPrimaryColor, borderRadius: 1, opacity: 0.2 }} />
                                <Box sx={{ height: 10, width: settings.darkPrimaryColor, borderRadius: 1, bgcolor: settings.darkPrimaryColor }} />
                            </Box>

                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                Primary color for dark mode
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {colorOptions.map(color => (
                                    <IconButton 
                                        key={color} 
                                        size="small" 
                                        onClick={() => handleColorChange('dark', color)}
                                        sx={{ 
                                            width: 28, height: 28, bgcolor: color, 
                                            '&:hover': { bgcolor: color, opacity: 0.8 },
                                            border: settings.darkPrimaryColor === color ? '2px solid #fff' : 'none'
                                        }}
                                    >
                                        {settings.darkPrimaryColor === color && <IconCircleCheckFilled size={14} color="#fff" />}
                                    </IconButton>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Contrast Section */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Contrast</Typography>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <Stack divider={<Box sx={{ height: '1px', bgcolor: 'divider' }} />}>
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>Light mode contrast</Typography>
                                <Typography variant="caption" color="text.secondary">Enable high contrast for light mode</Typography>
                            </Box>
                            <Switch 
                                checked={settings.lightContrast} 
                                onChange={() => handleContrastChange('light')} 
                            />
                        </Box>
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>Dark mode contrast</Typography>
                                <Typography variant="caption" color="text.secondary">Enable high contrast for dark mode</Typography>
                            </Box>
                            <Switch 
                                checked={settings.darkContrast} 
                                onChange={() => handleContrastChange('dark')} 
                            />
                        </Box>
                    </Stack>
                </Card>
            </Box>
        </Box>
    );
};

export default ThemeSettings;
