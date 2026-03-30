'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="URL Encode/Decode" description="Safely encode and decode symbols for URL usage.">
      <DashboardCard title="URL Encode/Decode">
        <Typography>This component for URL Encode/Decode is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
