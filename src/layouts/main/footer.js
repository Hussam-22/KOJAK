import { useLocation } from 'react-router';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, alpha, useTheme } from '@mui/material';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { navConfig } from 'src/layouts/main/config-navigation';
import JoinNewsletter from 'src/sections/about/join-newsletter';
import ContactUsInfo from 'src/sections/contact-us/contactUsInfo';

// ----------------------------------------------------------------------

const GROUPS = [
  {
    title: 'exclusive',
    url: 'www.kojak-spareparts.com',
    image: 'k-exclusive',
  },
  {
    title: 'spareParts',
    url: 'www.kojak-spareparts.com',
    image: 'spare-parts',
  },
  {
    title: 'auto',
    url: 'www.kojak-auto-maintenance.com',
    image: 'auto-main',
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive('up', 'md');
  const path = useLocation();
  const mUItheme = useTheme();
  const { translate } = useLocales();

  const mainFooter = (
    <Box
      sx={{
        bgcolor: 'common.black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <JoinNewsletter />
      <Divider />
      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 1.5, md: 3 },
          alignSelf: 'flex-end',
        }}
        maxWidth="xl"
      >
        <Grid container spacing={6} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={2}>
              <Logo small light />
              <Typography
                variant="body2"
                sx={{ color: 'common.white', fontWeight: mUItheme.typography.fontWeightLight }}
              >
                {translate('footer.about')}
              </Typography>

              <ContactUsInfo small light />
            </Stack>
          </Grid>

          <Grid xs={12} md={2}>
            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              {translate('footer.groupTitle')}
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {GROUPS.map((group) => (
                <Link
                  href={group.url}
                  target="_blank"
                  rel="noopener"
                  key={group.title}
                  sx={{ color: 'common.white' }}
                >
                  {translate(`footer.${group.title}.title`)}
                </Link>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ color: 'primary.main' }}>
              {translate('footer.sitemap')}
            </Typography>
            <Stack spacing={{ md: 2, xs: 1 }} sx={{ mt: 2 }}>
              {navConfig.map((list) => (
                <Typography key={list.title} variant="body2">
                  <Link
                    component={RouterLink}
                    href={list.path}
                    rel="noopener"
                    sx={{ color: 'common.white' }}
                  >
                    {translate(`header.${list.title}`)}
                  </Link>
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid
            md={4}
            xs={12}
            sx={{
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
              {translate(`footer.availableVehicles`)}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>Hussam</Box> */}
            <Typography
              sx={{
                fontSize: { md: '8dvw', xs: '14dvw' },
                WebkitTextStroke: `1px ${alpha(mUItheme.palette.common.white, 0.45)}`,
                color: alpha(mUItheme.palette.background.default, 0),
                lineHeight: 1,
              }}
            >
              {translate(`footer.since`)}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ p: 1 }} />

        <Stack spacing={1} direction="column" sx={{ pt: 1, textAlign: 'center' }}>
          <Typography
            variant="caption"
            sx={{ color: 'common.white', fontWeight: mUItheme.typography.fontWeightLight }}
          >
            {translate('footer.allRights')}
          </Typography>

          <Link href="mailto:hello@prozeffect.com" variant="caption" sx={{ color: 'primary.main' }}>
            {translate('footer.designedBy')}
          </Link>
        </Stack>
      </Container>
    </Box>
  );

  // return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
  return <footer>{mainFooter}</footer>;
}
