'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="User-Agent Parser" description="Parse and analyze your browser's User-Agent string.">
      <DashboardCard title="User-Agent Parser">
        <Typography>This component for User-Agent Parser is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
