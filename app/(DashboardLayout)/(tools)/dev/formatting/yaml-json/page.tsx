'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="YAML ↔ JSON Converter" description="Convert between YAML and JSON formats.">
      <DashboardCard title="YAML ↔ JSON Converter">
        <Typography>This component for YAML ↔ JSON Converter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
