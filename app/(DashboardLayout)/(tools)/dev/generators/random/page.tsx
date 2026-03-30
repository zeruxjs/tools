'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Random Data Generator" description="Generate random strings, numbers, and dummy data.">
      <DashboardCard title="Random Data Generator">
        <Typography>This component for Random Data Generator is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
