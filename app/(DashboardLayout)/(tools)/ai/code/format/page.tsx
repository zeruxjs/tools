'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Code Formatter" description="AI-enhanced code formatting for various programming languages.">
      <DashboardCard title="Code Formatter">
        <Typography>This component for AI Code Formatter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
