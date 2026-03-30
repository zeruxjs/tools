'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Port Scanner" description="Check if specific ports are open on a host.">
      <DashboardCard title="Port Scanner">
        <Typography>This component for Port Scanner is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
