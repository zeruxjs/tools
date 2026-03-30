'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="JSON \u2192 TS Interface" description="Convert JSON objects into TypeScript interfaces automatically.">
      <DashboardCard title="JSON \u2192 TS Interface">
        <Typography>This component for JSON \u2192 TS Interface is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
