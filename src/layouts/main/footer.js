import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Box, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import { _autoRepairServices } from 'src/_mock';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { navConfig } from 'src/layouts/main/config-navigation';
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
  const mUItheme = useTheme();
  const { translate } = useLocales();

  const mainFooter = (
    <Box sx={{ bgcolor: 'common.black' }}>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 1.5, md: 3 },
        }}
        maxWidth="xl"
      >
        <Grid container spacing={6} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={2}>
              <Logo small />
              <Typography
                variant="body2"
                sx={{ color: 'common.white', fontWeight: mUItheme.typography.fontWeightLight }}
              >
                {translate('footer.about')}
              </Typography>

              <ContactUsInfo small />
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

          <Grid md={4} xs={12}>
            <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
              {translate(`services.title`)}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
              {_autoRepairServices
                .filter((service) => !service.isDisabled && !service.isOffer)
                .map((service) => (
                  <Typography key={service.serviceName} variant="body2">
                    {translate(`services.items.${service.icon}.serviceName`)}
                  </Typography>
                ))}
            </Box>
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
