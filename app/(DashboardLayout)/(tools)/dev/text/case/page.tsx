'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Text Case Converter" description="Convert text between upper case, lower case, camelCase, etc.">
      <DashboardCard title="Text Case Converter">
        <Typography>This component for Text Case Converter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
