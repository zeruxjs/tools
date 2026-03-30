'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="SQL Query Generator (AI)" description="Generate complex SQL queries from natural language descriptions.">
      <DashboardCard title="SQL Query Generator (AI)">
        <Typography>This component for AI SQL Generator is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
