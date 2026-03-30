'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Regex Generator (AI)" description="Describe your matching requirements and get a regex instantly.">
      <DashboardCard title="Regex Generator (AI)">
        <Typography>This component for AI Regex Generator is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
