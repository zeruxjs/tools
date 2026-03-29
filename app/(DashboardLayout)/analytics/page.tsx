'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const AnalyticsPage = () => {
  return (
    <PageContainer title="Analytics" description="this is Analytics page">
      <DashboardCard title="Analytics Page">
        <Typography>This is a sample Analytics page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default AnalyticsPage;
