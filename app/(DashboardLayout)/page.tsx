'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
             {/* Main Dashboard Content Area */}
             <Box sx={{ p: 3, border: '1px dashed grey', textAlign: 'center' }}>
               Dashboard Content Area (Charts removed)
             </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
