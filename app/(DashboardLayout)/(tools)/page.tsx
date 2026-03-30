'use client'
import { Grid, Box, Typography, Card, CardContent, Stack } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { Menuitems } from '../layout/sidebar/NavigationItems';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { IconPoint } from '@tabler/icons-react';

const Dashboard = () => {
  const theme = useTheme();

  // Categorize and flatten tools based on subheaders from NavigationItems
  const toolCategories = Menuitems.reduce((acc: any[], item: any, index: number) => {
    if (item.navlabel) {
      const sectionItems: any[] = [];
      // Look forward until the next subheader or end of list
      for (let i = index + 1; i < Menuitems.length; i++) {
        const currentItem = Menuitems[i];
        if (currentItem.navlabel) break;
        if (currentItem.divider) continue;

        if (currentItem.children && currentItem.children.length > 0) {
          // If it has children, add them all directly
          currentItem.children.forEach((child: any) => {
            sectionItems.push({
              ...child,
              icon: child.icon === IconPoint ? currentItem.icon : child.icon,
              categoryTitle: currentItem.title
            });
          });
        } else if (currentItem.href) {
          // Regular tool without children
          sectionItems.push(currentItem);
        }
      }
      
      if (sectionItems.length > 0 && item.subheader !== 'Settings') {
        acc.push({ title: item.subheader, items: sectionItems });
      }
    }
    return acc;
  }, []);

  return (
    <PageContainer title="All Tools" description="Browse and use any of our developer tools.">
      <Box sx={{ p: { xs: 0, sm: 2 } }}>
        <Typography variant="h3" sx={{ mb: 1, fontWeight: '700', color: 'text.primary' }}>
          Explore Toolkit
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          Direct access to all individual modules for rapid development and testing.
        </Typography>

        <Stack spacing={6}>
          {toolCategories.map((cat) => (
            <Box key={cat.title}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  fontWeight: '700', 
                  display: 'flex', 
                  alignItems: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '0.75rem',
                  color: 'primary.main',
                  opacity: 0.8
                }}
              >
                {cat.title}
                <Box sx={{ ml: 2, flexGrow: 1, height: '1px', bgcolor: 'divider', opacity: 0.3 }} />
              </Typography>
              <Grid container spacing={2}>
                {cat.items.map((tool: any) => {
                  const Icon = tool.icon || IconPoint;
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tool.id}>
                      <Card 
                        component={Link} 
                        href={tool.href}
                        sx={{ 
                          textDecoration: 'none',
                          transition: 'all 0.2s ease-in-out',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '12px',
                          border: '1px solid',
                          borderColor: 'divider',
                          bgcolor: 'background.paper',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: theme.shadows[4],
                            borderColor: 'primary.main',
                            '& .tool-icon-box': {
                              color: 'primary.main',
                              bgcolor: 'primary.light',
                              transform: 'scale(1.1)'
                            }
                          }
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box 
                              className="tool-icon-box"
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                p: 1,
                                borderRadius: '8px',
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                color: 'text.secondary',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <Icon size="20" stroke={1.5} />
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: '600', color: 'text.primary', fontSize: '13px', lineHeight: '1.4' }}>
                                {tool.title}
                              </Typography>
                              {tool.categoryTitle && (
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px', opacity: 0.7 }}>
                                  {tool.categoryTitle}
                                </Typography>
                              )}
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))}
        </Stack>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
