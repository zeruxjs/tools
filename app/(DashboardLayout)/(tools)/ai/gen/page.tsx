'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Smart Generators" description="Sophisticated AI generators for complex patterns and queries.">
      <DashboardCard title="Smart Generators">
        <Typography>Select a smart generator from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
