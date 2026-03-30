'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Clipboard Sync" description="Synchronize your clipboard across multiple devices in real-time.">
      <DashboardCard title="Clipboard Sync">
        <Typography>This component for Clipboard Sync is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
