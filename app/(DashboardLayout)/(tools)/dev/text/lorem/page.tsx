'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Lorem Ipsum Generator" description="Generate placeholder text for your designs.">
      <DashboardCard title="Lorem Ipsum Generator">
        <Typography>This component for Lorem Ipsum Generator is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
