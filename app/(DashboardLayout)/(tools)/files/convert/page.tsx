'use client';
import { Typography, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Page = () => {
  return (
    <PageContainer title="File Converter" description="Convert files between different formats (PDF, DOCX, JPG, PNG, etc.).">
      <DashboardCard title="File Converter">
        <Typography>This component for Universal File Converter is coming soon.</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page;
