'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="JWT Encoder/Decoder" description="Encode and decode JSON Web Tokens.">
      <DashboardCard title="JWT Encoder/Decoder">
        <Typography>This component for JWT Encoder/Decoder is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
