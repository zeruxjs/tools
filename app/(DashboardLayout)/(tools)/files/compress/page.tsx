'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="Image Compressor" description="Reduce the file size of your images while maintaining quality.">
      <DashboardCard title="Image Compressor">
        <Typography>This component for Image Compression is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
