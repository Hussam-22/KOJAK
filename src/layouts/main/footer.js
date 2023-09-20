import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Box, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo';
import { useLocales } from 'src/locales';
import { RouterLink } from 'src/routes/components';
import { navConfig } from 'src/layouts/main/config-navigation';
import JoinNewsletter from 'src/sections/about/join-newsletter';
import ContactUsInfo from 'src/sections/contact-us/contactUsInfo';
import { AUTO_URL, BUILDING_URL, EXCLUSIVE_URL, SPARE_PART_URL } from 'src/config-global';

// ----------------------------------------------------------------------

const GROUPS = [
  {
    title: 'exclusive',
    url: EXCLUSIVE_URL,
  },
  {
    title: 'spareParts',
    url: SPARE_PART_URL,
  },
  {
    title: 'auto',
    url: AUTO_URL,
  },
  {
    title: 'building',
    url: BUILDING_URL,
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mUItheme = useTheme();
  const { translate } = useLocales();

  return (
    <footer>
      <Box sx={{ bgcolor: 'common.black' }}>
        <Container
          sx={{
            overflow: 'hidden',
            py: { xs: 1.5, md: 3 },
          }}
          maxWidth="xl"
        >
          <Grid container spacing={6} justifyContent={{ md: 'space-between' }}>
            <Grid xs={12} md={5}>
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

            <Grid md={5} xs={12}>
              <JoinNewsletter />
            </Grid>
          </Grid>

          <Divider sx={{ p: 1 }} />

          <Stack
            spacing={1}
            direction={{ md: 'row', xs: 'column' }}
            sx={{ pt: 1, textAlign: 'center' }}
            justifyContent="space-between"
          >
            <Typography
              variant="caption"
              sx={{ color: 'common.white', fontWeight: mUItheme.typography.fontWeightLight }}
            >
              {translate('footer.allRights')}
            </Typography>

            <Link
              href="mailto:hello@prozeffect.com"
              variant="caption"
              sx={{ color: 'primary.main' }}
            >
              {translate('footer.designedBy')}
            </Link>
          </Stack>
        </Container>
      </Box>
    </footer>
  );
}
