'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Meta Tag Preview" description="Preview how your site looks on social media and search engines.">
      <DashboardCard title="Meta Tag Preview">
        <Typography>This component for Meta Tag Preview is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
