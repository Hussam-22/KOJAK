import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Card, useTheme } from '@mui/material';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
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
              Auto Repair Services
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
              {_autoRepairServices.map((service) => (
                <Typography key={service.serviceName} variant="body2">
                  {service.serviceName}
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

          <Link href="mailto:hello@prozeffect.com" variant="caption" sx={{ color: 'error.main' }}>
            {translate('footer.designedBy')}
          </Link>
        </Stack>
      </Container>
    </Box>
  );

  // return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
  return <footer>{mainFooter}</footer>;
}

function GroupsCard() {
  const { translate } = useLocales();
  const theme = useTheme();
  const renderOverlay = (
    <Box
      sx={{
        backgroundColor: alpha('#000000', 0.45),
        top: 0,
        left: 0,
        zIndex: -1,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, color: 'common.white' }}>
        {translate(`footer.groupTitle`)}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          columnGap: 1,
          height: '90%',
        }}
      >
        {GROUPS.map((group, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 0.5,
              p: 1,
              backgroundImage: `url(/assets/kojak-building/group/${group.image}.webp)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              textAlign: 'center',
            }}
          >
            <Box sx={{ my: 'auto' }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'common.white',
                }}
              >
                {translate(`footer.${group.title}.title`)}
              </Typography>
              <Typography
                sx={{
                  color: 'common.white',
                  fontWeight: theme.typography.fontWeightLight,
                }}
              >
                {translate(`footer.${group.title}.text`)}
              </Typography>
            </Box>
            <Link
              href={group.url}
              target="_blank"
              rel="noopener"
              sx={{
                m: 2,
                color: 'common.white',
                fontWeight: theme.typography.fontWeightLight,
              }}
            >
              {translate(`footer.visitWebsite`)} <Iconify icon="quill:link-out" />
            </Link>
            {renderOverlay}
          </Card>
        ))}
      </Box>
    </>
  );
}
