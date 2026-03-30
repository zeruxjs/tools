'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Generators" description="Generate various types of data and identifiers.">
      <DashboardCard title="Generators">
        <Typography>Select a generator from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
