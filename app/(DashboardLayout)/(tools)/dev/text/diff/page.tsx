'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Diff Checker" description="Compare two pieces of text and see the differences.">
      <DashboardCard title="Diff Checker">
        <Typography>This component for Diff Checker is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
