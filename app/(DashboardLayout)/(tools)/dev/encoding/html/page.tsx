'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="HTML Encode/Decode" description="Encode and decode HTML entities.">
      <DashboardCard title="HTML Encode/Decode">
        <Typography>This component for HTML Encode/Decode is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
