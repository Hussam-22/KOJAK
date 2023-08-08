import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Box, Card } from '@mui/material';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Button, { buttonClasses } from '@mui/material/Button';

import { _socials } from 'src/_mock';
import Logo from 'src/components/logo';
import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import { usePathname } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

const GROUPS = [
  {
    title: 'KOJAK K-Exclusive',
    text: 'Buy your dream Mercedes',
    url: 'www.kojak-k-exclusive.com',
    image: 'k-exclusive',
  },
  {
    title: 'KOJAK Spare Parts',
    text: 'Geniun spare parts for your Mercedes',
    url: 'www.kojak-spare-parts.com',
    image: 'spare-parts',
  },
  {
    title: 'KOJAK Auto Maintenance',
    text: 'Fix your Mercedes by experts',
    url: 'kojak-auto-maintenance',
    image: 'auto-main',
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');

  const pathname = usePathname();

  // const mobileList = navConfig.find((i) => i.title === 'Pages')?.children || [];

  // const desktopList = pageLinks.sort((listA, listB) => Number(listA.order) - Number(listB.order));

  // const renderLists = mdUp ? desktopList : mobileList;

  const isHome = pathname === '/';

  const renderOverlay = (
    <Box
      sx={{
        ...bgGradient({
          startColor: `${alpha('#000000', 0)} 50%`,
          endColor: `${'#000000'} 100%`,
        }),
        backgroundColor: alpha('#000000', 0.24),
        top: 0,
        left: 0,
        zIndex: -1,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );

  const simpleFooter = (
    <Box sx={{ borderTop: (theme) => `solid 1px ${theme.palette.divider}` }}>
      <Container
        sx={{
          py: 1,
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'left',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Logo single />

        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Kojak Group of Companies © 2023. All rights reserved | www.kojak-group.com
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'primary.main' }}>
          Designed by ProzEffect | hello@prozeffect.com
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box sx={{ bgcolor: 'primary.lighter' }}>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 3 },
        }}
        maxWidth="xl"
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={5}>
            <Stack spacing={2}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Kojak stands as a multifaceted group of companies, each specializing in a unique
                  facet that collectively shapes a comprehensive automotive ecosystem. its presence
                  in four distinct domains: car spare-parts, auto maintenance, the exclusive sale of
                  Mercedes cars, and the versatile realm of space leasing and renting.
                </Typography>
              </Stack>

              <Stack spacing={2} alignItems="flex-start">
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify icon="carbon:email" width={24} sx={{ mr: 1 }} /> Email
                  </Stack>

                  <Link color="inherit" variant="body2" href="mailto:hello@kojak-building.com">
                    hello@kojak-building.com
                  </Link>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify icon="carbon:mobile" width={24} sx={{ mr: 1 }} /> Phone
                  </Stack>

                  <Typography variant="body2">052 924 2623</Typography>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify icon="carbon:location" width={24} sx={{ mr: 1 }} /> Address
                  </Stack>

                  <Typography variant="body2">
                    <Link
                      href="https://www.google.com/maps/place/Kojak+Group+of+Companies/@25.3253059,55.4046755,15z/data=!4m6!3m5!1s0x3e5f57dbcabe0c49:0x67452d730806d23a!8m2!3d25.3253059!4d55.4046755!16s%2Fg%2F11bbwn0zxl?entry=ttu"
                      target="_blank"
                      rel="noopener"
                    >
                      Industrial Area 4, Sharjah, United Arab Emirates
                    </Link>
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify icon="mingcute:time-line" width={24} sx={{ mr: 1 }} /> Working Hours
                  </Stack>

                  <Typography variant="body2">8 AM to 6 PM - Saturday to Thursday</Typography>
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Social</Typography>
                <Stack direction="row" alignItems="center">
                  {_socials.map((social) => (
                    <IconButton key={social.value} color="primary">
                      <Iconify icon={social.icon} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={7}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  columnGap: 3,
                  height: '100%',
                }}
              >
                {GROUPS.map((group, index) => (
                  <Card
                    sx={{
                      borderRadius: 1,
                      p: 3,
                      backgroundImage: `url(/assets/kojak-building/group/${group.image}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      // position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'common.white',
                        }}
                      >
                        {group.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'common.white',
                        }}
                      >
                        {group.text}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      // sx={{ backgroundColor: 'common.white' }}
                    >
                      Visit Website
                    </Button>
                    {renderOverlay}
                  </Card>
                ))}
              </Box>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ p: 1 }} />

        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 1, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2023. All rights reserved - Kojak Group of Companies
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link
              href="mailto:hello@prozeffect.com"
              variant="caption"
              sx={{ color: 'primary.main' }}
            >
              Designed by ProzEffect | hello@prozeffect.com
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );

  // return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function AppStoreButton({ ...other }) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      <StyledAppStoreButton startIcon={<Iconify icon="ri:apple-fill" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download on the
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Apple Store
          </Typography>
        </Stack>
      </StyledAppStoreButton>

      <StyledAppStoreButton startIcon={<Iconify icon="logos:google-play-icon" width={28} />}>
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download from
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Google Play
          </Typography>
        </Stack>
      </StyledAppStoreButton>
    </Stack>
  );
}
