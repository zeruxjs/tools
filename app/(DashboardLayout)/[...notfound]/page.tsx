"use client";
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ pt: 10 }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Button variant="contained" component={Link} href="/" sx={{ borderRadius: '8px' }}>
        Go Back Home
      </Button>
    </Box>
  );
}
