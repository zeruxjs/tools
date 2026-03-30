'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="SessionStorage Viewer" description="Explore data stored in your browser's SessionStorage.">
      <DashboardCard title="SessionStorage Viewer">
        <Typography>This component for SessionStorage Viewer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
