'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Ping Tool" description="Test the reachability of a host on an IP network.">
      <DashboardCard title="Ping Tool">
        <Typography>This component for Ping Tool is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
