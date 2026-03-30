"use client";
import React from 'react';
import { Box, Typography, TextField, Switch, FormControlLabel, Stack, Button, Divider } from '@mui/material';

const GeneralSettings = () => {
    return (
        <Box>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Configure your core dashboard preferences and system behaviors.</Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Stack spacing={3}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 1 }}>Dashboard Name</Typography>
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        size="small" 
                        placeholder="My Tools Dashboard" 
                        defaultValue="My Tools"
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 1 }}>Timezone</Typography>
                    <TextField 
                        fullWidth 
                        variant="outlined" 
                        size="small" 
                        defaultValue="UTC+05:30 (India Standard Time)" 
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600', mb: 1 }}>Privacy & Visibility</Typography>
                    <FormControlLabel 
                        control={<Switch defaultChecked />} 
                        label="Enable Public Profile" 
                    />
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', ml: 4 }}>
                        When enabled, your shared tools will be visible to everyone with the link.
                    </Typography>
                </Box>

                <Box sx={{ pt: 2, display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="primary">Save Changes</Button>
                    <Button variant="outlined" color="inherit">Reset Defaults</Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default GeneralSettings;
