"use client";
import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Button, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { IconShieldCheck, IconAd2, IconChartPie } from '@tabler/icons-react';

const CookiesSettings = () => {
    return (
        <Box>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Manage your privacy and data sharing settings.</Typography>

            <Divider sx={{ mb: 3 }} />

            <List>
                <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon><IconShieldCheck size="24" /></ListItemIcon>
                    <ListItemText 
                        primary="Necessary Cookies" 
                        secondary="Always active. These cookies are essential for the dashboard to function." 
                    />
                    <Switch disabled defaultChecked />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon><IconChartPie size="24" /></ListItemIcon>
                    <ListItemText 
                        primary="Performance & Analytics" 
                        secondary="Help us improve by collecting anonymous usage data." 
                    />
                    <Switch defaultChecked />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon><IconAd2 size="24" /></ListItemIcon>
                    <ListItemText 
                        primary="Marketing & Personalization" 
                        secondary="Allow tailored content and relevant updates." 
                    />
                    <Switch />
                </ListItem>
            </List>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary">Accept All</Button>
                <Button variant="outlined" color="inherit">Reject Optional</Button>
            </Box>
        </Box>
    );
};

export default CookiesSettings;
