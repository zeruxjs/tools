'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Case Converter" description="Convert text between UPPERCASE, lowercase, Sentence case, etc.">
      <DashboardCard title="Case Converter">
        <Typography>This component for Case Converter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
