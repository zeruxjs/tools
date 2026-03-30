'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Server Status" description="Monitor the real-time status and performance of your servers.">
      <DashboardCard title="Server Status">
        <Typography>This component for Server Status Monitoring is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
