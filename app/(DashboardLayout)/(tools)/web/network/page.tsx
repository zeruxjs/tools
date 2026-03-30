'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Network Tools" description="Network diagnostics and lookup tools.">
      <DashboardCard title="Network Tools">
        <Typography>Select a network tool from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
