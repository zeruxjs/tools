'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Tunnel Manager" description="Manage and monitor local-to-web tunnels (e.g., ngrok, Cloudflare).">
      <DashboardCard title="Tunnel Manager">
        <Typography>This component for Tunnel Manager is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
