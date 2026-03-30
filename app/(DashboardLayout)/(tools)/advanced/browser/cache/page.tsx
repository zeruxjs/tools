'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Cache Storage Viewer" description="View and manage data cached by your browser's Cache API.">
      <DashboardCard title="Cache Storage Viewer">
        <Typography>This component for Cache Storage Viewer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
