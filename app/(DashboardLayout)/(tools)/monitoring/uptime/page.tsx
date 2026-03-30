'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Uptime Monitor" description="Track the availability and response times of your websites and services.">
      <DashboardCard title="Uptime Monitor">
        <Typography>This component for Uptime Monitoring is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
