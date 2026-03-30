'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="JWT Decode / Verify" description="Inspect and verify JSON Web Tokens.">
      <DashboardCard title="JWT Decode / Verify">
        <Typography>This component for JWT Decode / Verify is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
