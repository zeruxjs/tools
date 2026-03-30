'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="P2P File Sharing" description="Direct peer-to-peer file transfer for maximum privacy and speed.">
      <DashboardCard title="P2P File Sharing">
        <Typography>This component for P2P File Sharing is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
