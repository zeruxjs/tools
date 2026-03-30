'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="URL Status Checker" description="Check the HTTP status code and response headers of any URL.">
      <DashboardCard title="URL Status Checker">
        <Typography>This component for URL Status Checker is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
