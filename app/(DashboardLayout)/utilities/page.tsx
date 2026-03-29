'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const UtilitiesPage = () => {
  return (
    <PageContainer title="Utilities" description="this is Utilities page">
      <DashboardCard title="Utilities Page">
        <Typography>This is a sample Utilities page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default UtilitiesPage;
