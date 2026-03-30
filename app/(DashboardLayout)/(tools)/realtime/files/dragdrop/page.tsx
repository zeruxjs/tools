'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Drag & Drop Share" description="Instantly share files by dragging and dropping them into the browser.">
      <DashboardCard title="Drag & Drop Share">
        <Typography>This component for Drag & Drop Share is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
