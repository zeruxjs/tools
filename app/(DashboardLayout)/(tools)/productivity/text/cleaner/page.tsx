'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Text Cleaner" description="Remove whitespace, special characters, and clean up messy text.">
      <DashboardCard title="Text Cleaner">
        <Typography>This component for Text Cleaner is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
