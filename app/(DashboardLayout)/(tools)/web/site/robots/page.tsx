'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Robots.txt Tester" description="Validate and test your robots.txt file.">
      <DashboardCard title="Robots.txt Tester">
        <Typography>This component for Robots.txt Tester is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
