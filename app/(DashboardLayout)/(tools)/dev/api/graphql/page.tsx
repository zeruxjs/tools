'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="GraphQL Explorer" description="Explore and test your GraphQL APIs.">
      <DashboardCard title="GraphQL Explorer">
        <Typography>This component for GraphQL Explorer is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
