'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Sitemap Generator" description="Automatically generate a sitemap for your website.">
      <DashboardCard title="Sitemap Generator">
        <Typography>This component for Sitemap Generator is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
