import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';

import { useLocales } from 'src/locales';
import { RouterLink } from 'src/routes/components';

import { StyledNavItem } from './styles';

// ----------------------------------------------------------------------

export const NavItem = forwardRef(
  ({ item, open, active, subItem, externalLink, ...other }, ref) => {
    const { translate, currentLang } = useLocales();
    const renderContent = (
      <StyledNavItem
        ref={ref}
        disableRipple
        subItem={subItem}
        active={active}
        open={open}
        {...other}
      >
        {translate(`header.${item.title}`)}
      </StyledNavItem>
    );

    // Default
    return (
      <Link component={RouterLink} href={item.path} color="inherit" underline="none">
        {renderContent}
      </Link>
    );
  }
);

NavItem.propTypes = {
  active: PropTypes.bool,
  externalLink: PropTypes.bool,
  item: PropTypes.shape({
    children: PropTypes.array,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
  open: PropTypes.bool,
  subItem: PropTypes.bool,
};
