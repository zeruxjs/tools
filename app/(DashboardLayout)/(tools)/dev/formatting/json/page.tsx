'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="JSON Formatter / Validator" description="Prettify, minify, and validate JSON data.">
      <DashboardCard title="JSON Formatter / Validator">
        <Typography>This component for JSON Formatter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
