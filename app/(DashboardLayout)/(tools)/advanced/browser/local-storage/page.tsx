'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="LocalStorage Viewer" description="Explore data stored in your browser's LocalStorage.">
      <DashboardCard title="LocalStorage Viewer">
        <Typography>This component for LocalStorage Viewer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
