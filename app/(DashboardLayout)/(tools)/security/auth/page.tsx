'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Authentication & Tokens" description="Tools for generating and validating auth tokens.">
      <DashboardCard title="Authentication & Tokens">
        <Typography>Select an authentication tool from the menu to get started.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
