'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Base64 Encode/Decode" description="Encode and decode strings in Base64 format.">
      <DashboardCard title="Base64 Encode/Decode">
        <Typography>This component for Base64 Encode/Decode is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
