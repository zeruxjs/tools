'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Service Worker Manager" description="Monitor and manage registered service workers in your browser.">
      <DashboardCard title="Service Worker Manager">
        <Typography>This component for Service Worker Manager is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
