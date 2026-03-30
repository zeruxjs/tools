'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Website Screenshot" description="Capture screenshots of any website in various resolutions.">
      <DashboardCard title="Website Screenshot">
        <Typography>This component for Website Screenshot is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
