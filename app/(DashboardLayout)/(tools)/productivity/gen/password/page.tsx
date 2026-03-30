'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Password Generator (simple)" description="Generate quick and simple passwords for everyday use.">
      <DashboardCard title="Password Generator (simple)">
        <Typography>This component for Simple Password Generator is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
