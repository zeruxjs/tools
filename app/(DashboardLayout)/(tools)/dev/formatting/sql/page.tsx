'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="SQL Formatter" description="Prettify and format SQL queries.">
      <DashboardCard title="SQL Formatter">
        <Typography>This component for SQL Formatter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
