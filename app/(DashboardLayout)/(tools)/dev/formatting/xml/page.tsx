'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="XML Formatter" description="Prettify and format XML data.">
      <DashboardCard title="XML Formatter">
        <Typography>This component for XML Formatter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
