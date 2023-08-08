import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import Image from 'src/components/image';
import Label from 'src/components/label';
import { usePathname } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import { NavItem } from './nav-item';
import { StyledSubheader } from './styles';

// ----------------------------------------------------------------------

export default function NavList({ item }) {
  const pathname = usePathname();

  const menuOpen = useBoolean();

  const active = useActiveLink(item.path, false);

  const externalLink = item.path.includes('http');

  const mainList = item.children ? item.children.filter((list) => list.subheader !== 'Common') : [];

  const commonList = item.children
    ? item.children.find((list) => list.subheader === 'Common')
    : null;

  useEffect(() => {
    if (menuOpen.value) {
      menuOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (item.children) {
      menuOpen.onTrue();
    }
  }, [item.children, menuOpen]);

  return (
    <NavItem
      item={item}
      active={active}
      open={menuOpen.value}
      externalLink={externalLink}
      onMouseEnter={handleOpenMenu}
      onMouseLeave={menuOpen.onFalse}
    />
  );
}

NavList.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.array,
    path: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function NavSubList({ subheader, isNew, cover, items }) {
  const pathname = usePathname();

  const coverPath = items.length ? items[0].path : '';

  const commonList = subheader === 'Common';

  return (
    <Stack spacing={2}>
      <StyledSubheader>
        {subheader}
        {isNew && (
          <Label color="info" sx={{ ml: 1 }}>
            NEW
          </Label>
        )}
      </StyledSubheader>

      {!commonList && (
        <Link component={RouterLink} href={coverPath}>
          <Image
            disabledEffect
            alt={cover}
            src={cover || '/assets/placeholder.svg'}
            ratio="16/9"
            sx={{
              borderRadius: 1,
              cursor: 'pointer',
              boxShadow: (theme) => theme.customShadows.z8,
              transition: (theme) => theme.transitions.create('all'),
              '&:hover': {
                opacity: 0.8,
                boxShadow: (theme) => theme.customShadows.z24,
              },
            }}
          />
        </Link>
      )}

      <Stack spacing={1.5} alignItems="flex-start">
        {items.map((item) => {
          const active = pathname === item.path || pathname === `${item.path}/`;

          return <NavItem key={item.title} item={item} active={active} subItem />;
        })}
      </Stack>
    </Stack>
  );
}

NavSubList.propTypes = {
  cover: PropTypes.string,
  isNew: PropTypes.bool,
  items: PropTypes.array,
  subheader: PropTypes.string,
};
