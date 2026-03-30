'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Browser Internals" description="Inspect browser-specific storage systems.">
      <DashboardCard title="Browser Internals">
        <Typography>Select a browser internal tool from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
