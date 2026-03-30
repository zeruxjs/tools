'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="CSP Analyzer" description="Analyze Content Security Policy headers for vulnerabilities.">
      <DashboardCard title="CSP Analyzer">
        <Typography>This component for CSP Analyzer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
