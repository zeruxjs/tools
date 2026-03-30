'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="HTTP Headers Viewer" description="View headers sent by your browser in real-time.">
      <DashboardCard title="HTTP Headers Viewer">
        <Typography>This component for HTTP Headers Viewer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
