'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="CSV ↔ JSON Converter" description="Convert between CSV and JSON formats.">
      <DashboardCard title="CSV ↔ JSON Converter">
        <Typography>This component for CSV ↔ JSON Converter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
