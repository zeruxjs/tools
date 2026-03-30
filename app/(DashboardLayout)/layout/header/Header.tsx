import { Box, AppBar, Toolbar, styled, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// components
import { IconMenu } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { Menuitems } from '../sidebar/NavigationItems';

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
}));

import { useThemeSettings } from '@/utils/theme/ThemeContext';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

const Header = ({toggleMobileSidebar}: ItemType) => {
  const { settings, toggleThemeMode } = useThemeSettings();
  const pathname = usePathname();

  const findCurrentTitle = (items: any[]): string => {
    for (const item of items) {
      if (item.href === pathname) return item.title;
      if (item.children) {
        const childTitle = findCurrentTitle(item.children);
        if (childTitle) return childTitle;
      }
    }
    return '';
  };

  const currentTitle = findCurrentTitle(Menuitems) || 'Dashboard';

  const getThemeIcon = () => {
    switch (settings.themeMode) {
      case 'light': return <IconSun width="20" height="20" />;
      case 'dark': return <IconMoon width="20" height="20" />;
      default: return <IconDeviceDesktop width="20" height="20" />;
    }
  };

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Typography 
          variant="h5" 
          sx={{ 
            ml: { xs: 1, lg: 0 }, 
            fontWeight: '600', 
            color: 'text.primary',
            fontSize: { xs: '1.1rem', lg: '1.25rem' }
          }}
        >
          {currentTitle}
        </Typography>

        <Box flexGrow={1} />
        
        <IconButton 
          color="inherit" 
          onClick={toggleThemeMode}
          title={`Theme Mode: ${settings.themeMode}`}
        >
          {getThemeIcon()}
        </IconButton>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
