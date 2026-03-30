'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="IP Lookup" description="Find geolocation and network info for any IP address.">
      <DashboardCard title="IP Lookup">
        <Typography>This component for IP Lookup is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
