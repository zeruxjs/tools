'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="DNS Lookup" description="Check DNS records (A, AAAA, MX, TXT, etc.) for any domain.">
      <DashboardCard title="DNS Lookup">
        <Typography>This component for DNS Lookup is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
