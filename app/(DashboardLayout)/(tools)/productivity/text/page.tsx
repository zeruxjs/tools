'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Text Utilities" description="Common text manipulation utilities for daily productivity.">
      <DashboardCard title="Text Utilities">
        <Typography>Select a text utility from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
