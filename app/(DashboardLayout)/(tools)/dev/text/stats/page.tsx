'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Text Stats" description="Analyze text for character count, word count, and word density.">
      <DashboardCard title="Text Stats">
        <Typography>This component for Text Stats is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
