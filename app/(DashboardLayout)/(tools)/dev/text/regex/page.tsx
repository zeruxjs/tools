'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Regex Tester" description="Test and debug regular expressions.">
      <DashboardCard title="Regex Tester">
        <Typography>This component for Regex Tester is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
