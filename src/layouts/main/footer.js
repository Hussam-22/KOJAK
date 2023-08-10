import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Card, useTheme } from '@mui/material';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import { navConfig } from 'src/layouts/main/config-navigation';
import ContactUsInfo from 'src/sections/_kojakBuilding/contact-us/contactUsInfo';

// ----------------------------------------------------------------------

const GROUPS = [
  {
    title: 'K-Exclusive',
    text: 'Buy your dream Mercedes',
    url: 'www.kojak-k-exclusive.com',
    image: 'k-exclusive',
  },
  {
    title: 'Spare Parts',
    text: 'Geniun spare parts for your Mercedes',
    url: 'www.kojak-spare-parts.com',
    image: 'spare-parts',
  },
  {
    title: 'Auto Maintenance',
    text: 'Fix your Mercedes by experts',
    url: 'kojak-auto-maintenance',
    image: 'auto-main',
  },
];
// ----------------------------------------------------------------------

const THIS_YEAR = new Date().getFullYear();

export default function Footer() {
  const mdUp = useResponsive('up', 'md');
  const mUItheme = useTheme();

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
          Kojak Group of Companies © {THIS_YEAR}. All rights reserved | www.kojak-group.com
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'primary.main' }}>
          Designed by ProzEffect | hello@prozeffect.com
        </Typography>
      </Container>
    </Box>
  );

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
          <Grid xs={12} md={5}>
            <Stack spacing={2}>
              <Logo small light />
              <Typography
                variant="body2"
                sx={{ color: 'common.white', fontWeight: mUItheme.typography.fontWeightLight }}
              >
                Kojak stands as a multifaceted group of companies, each specializing in a unique
                facet that collectively shapes a comprehensive automotive ecosystem. its presence in
                four distinct domains: car spare-parts, auto maintenance, the exclusive sale of
                Mercedes cars, and the versatile realm of space leasing and renting.
              </Typography>

              <ContactUsInfo light small />
            </Stack>
          </Grid>

          {!mdUp && (
            <Grid xs={6} md={2}>
              <Typography variant="h6" sx={{ color: 'common.white' }}>
                Kojak Group of Companies
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {GROUPS.map((group) => (
                  <Typography key={group.title} variant="body2" sx={{ color: 'primary.main' }}>
                    {/* <Link component={RouterLink} href={list.path} rel="noopener">
                      {list.title}
                    </Link> */}
                    {group.title}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          )}

          <Grid xs={6} md={2}>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Sitemap
            </Typography>
            <Stack spacing={{ md: 2, xs: 1 }} sx={{ mt: 2 }}>
              {navConfig.map((list) => (
                <Typography key={list.title} variant="body2">
                  <Link
                    component={RouterLink}
                    href={list.path}
                    rel="noopener"
                    sx={{ color: 'primary.light' }}
                  >
                    {list.title}
                  </Link>
                </Typography>
              ))}
            </Stack>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={5}>
              <GroupsCard />
            </Grid>
          )}
        </Grid>

        <Divider sx={{ p: 1 }} />

        <Stack
          spacing={1}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 1, textAlign: 'center' }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'common.white', fontWeight: mUItheme.typography.fontWeightLight }}
          >
            © {THIS_YEAR}. All rights reserved - Kojak Group of Companies
          </Typography>

          <Link
            href="mailto:hello@prozeffect.com"
            variant="caption"
            sx={{ color: 'primary.light' }}
          >
            Designed by ProzEffect | hello@prozeffect.com
          </Link>
        </Stack>
      </Container>
    </Box>
  );

  // return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
  return <footer>{mainFooter}</footer>;
}

function GroupsCard() {
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
        Kojak Group of Companies
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
                {group.title}
              </Typography>
              <Typography
                sx={{
                  color: 'common.white',
                  fontWeight: theme.typography.fontWeightLight,
                }}
              >
                {group.text}
              </Typography>
            </Box>
            <Button
              variant="text"
              sx={{
                m: 2,
                color: 'common.white',
                fontWeight: theme.typography.fontWeightLight,
              }}
              endIcon={<Iconify icon="quill:link-out" />}
            >
              Visit Website
            </Button>
            {renderOverlay}
          </Card>
        ))}
      </Box>
    </>
  );
}
