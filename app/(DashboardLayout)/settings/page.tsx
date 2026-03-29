'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const SettingsPage = () => {
  return (
    <PageContainer title="Settings" description="this is Settings page">
      <DashboardCard title="Settings Page">
        <Typography>This is a sample Settings page</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SettingsPage;
