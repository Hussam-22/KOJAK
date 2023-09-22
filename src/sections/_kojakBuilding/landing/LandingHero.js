import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';

const SUMMARY = [
  { label: 'happyTenants', value: 842, color: 'success', icon: 'ion:happy-outline' },
  { label: 'leasesProcessed', value: 12482, color: 'info', icon: 'solar:document-outline' },
  { label: 'apartments', value: 220, color: 'warning', icon: 'bx:building-house' },
  // { label: 'Years of Experience', value: 22, color: 'error', icon: 'ri:shield-star-line' },
];

// ----------------------------------------------------------------------

export default function KojakBuildingLandingHero() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { translate, onChangeLang, currentLang } = useLocales();

  return (
    <Box
      sx={{
        height: '100dvh',
        backgroundImage: `url(/assets/kojak-building/hero/hero-1.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Grid container sx={{ alignItems: 'center', height: '100%' }}>
          <Grid md={5} xs={12} sx={{ order: mdUp ? 0 : 1 }}>
            <Stack spacing={1}>
              {/* <Typography variant="overline">{translate('hero.overlineText')}</Typography> */}

              <Typography color="primary" variant="h1">
                {translate('hero.title')}
              </Typography>

              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate(paths.website.properties)}
                >
                  {translate('common.exploreProperties')}
                </Button>
              </Box>
              {/* sAX */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
