'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Theme Preferences" description="Customize the look and feel of your dashboard.">
      <DashboardCard title="Theme Preferences">
        <Typography>This component for Theme Preferences is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
