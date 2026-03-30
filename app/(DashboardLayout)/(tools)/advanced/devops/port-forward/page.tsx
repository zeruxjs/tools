'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Port Forwarding UI" description="Configure and manage port forwarding for your local machine.">
      <DashboardCard title="Port Forwarding UI">
        <Typography>This component for Port Forwarding UI is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
