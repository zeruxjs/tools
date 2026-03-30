'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Generators" description="Fast and reliable generators for common data types.">
      <DashboardCard title="Generators">
        <Typography>Select a generator from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
