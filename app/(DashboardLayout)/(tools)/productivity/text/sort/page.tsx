'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Sort Lines" description="Sort lines of text alphabetically, numerically, or in reverse order.">
      <DashboardCard title="Sort Lines">
        <Typography>This component for Sorting Lines is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
