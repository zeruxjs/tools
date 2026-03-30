'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="SSL Certificate Checker" description="Inspect SSL certificates for any domain.">
      <DashboardCard title="SSL Certificate Checker">
        <Typography>This component for SSL Certificate Checker is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
