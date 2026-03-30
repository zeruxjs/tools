'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Reverse Proxy Tester" description="Test your reverse proxy configurations and header forwarding.">
      <DashboardCard title="Reverse Proxy Tester">
        <Typography>This component for Reverse Proxy Tester is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
