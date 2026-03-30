'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Temp Chat" description="Initiate quick, temporary chat sessions for instant communication.">
      <DashboardCard title="Temp Chat">
        <Typography>This component for Temp Chat is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
