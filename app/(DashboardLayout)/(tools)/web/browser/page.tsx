'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Browser Tools" description="Inspect browser-related data and headers.">
      <DashboardCard title="Browser Tools">
        <Typography>Select a browser tool from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
