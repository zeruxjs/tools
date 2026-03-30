'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="WebSocket Tester" description="Test real-time WebSocket connections and messages.">
      <DashboardCard title="WebSocket Tester">
        <Typography>This component for WebSocket Tester is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
