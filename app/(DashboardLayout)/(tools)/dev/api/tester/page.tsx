'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="API Tester" description="Test REST API endpoints with various methods and parameters.">
      <DashboardCard title="API Tester">
        <Typography>This component for API Tester is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
