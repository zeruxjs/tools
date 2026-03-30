'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Cookie Viewer" description="Inspect and manage cookies in your current session.">
      <DashboardCard title="Cookie Viewer">
        <Typography>This component for Cookie Viewer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
