'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Password Strength Checker" description="Analyze the strength and complexity of your passwords.">
      <DashboardCard title="Password Strength Checker">
        <Typography>This component for Password Strength Checker is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
