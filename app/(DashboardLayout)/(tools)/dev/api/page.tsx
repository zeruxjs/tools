'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="API Tools" description="Manage and test your APIs with ease.">
      <DashboardCard title="API Tools">
        <Typography>Select an API tool from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
