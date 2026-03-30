'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Code Explainer" description="Get clear, concise explanations for any snippet of code using AI.">
      <DashboardCard title="Code Explainer">
        <Typography>This component for AI Code Explainer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
