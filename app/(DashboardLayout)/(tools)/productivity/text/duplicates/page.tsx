'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Remove Duplicate Lines" description="Quickly clean up lists by removing all redundant lines.">
      <DashboardCard title="Remove Duplicate Lines">
        <Typography>This component for Removing Duplicates is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
