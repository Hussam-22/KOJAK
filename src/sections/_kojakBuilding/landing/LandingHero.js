import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { bgBlur } from 'src/theme/css';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';
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

  const toggleLanguageHandler = () =>
    currentLang.value === 'en' ? onChangeLang('ar') : onChangeLang('en');

  return (
    <Box
      sx={{
        height: { md: '80dvh', xs: '95dvh' },
        overflow: 'hidden',
        backgroundImage: `url(/assets/kojak-building/hero/hero-img-${
          currentLang.value === 'en' ? '5' : '6'
        }.webp)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        pt: 15,
      }}
    >
      <Container maxWidth="xl">
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid md={7} xs={12} sx={{ order: mdUp ? 0 : 1 }}>
            <Stack
              sx={{
                textAlign: { md: 'left', xs: 'center' },
                // bgcolor: { md: 'unset', xs: 'common.white' },
                p: { md: 'unset', xs: 3 },
                borderRadius: { md: 'unset', xs: 2 },
                ...(mdUp ? {} : bgBlur({ color: '#FFFFFF' })),
              }}
              spacing={{ md: 1, xs: 2 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: 'common.black',
                }}
              >
                {translate('hero.overlineText')}
              </Typography>

              <Typography
                sx={{
                  mb: 3,
                  textTransform: 'capitalize',
                  fontSize: { lg: '3.25rem', md: '2.55rem', xs: '1.75rem' },
                  lineHeight: 1.25,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                {translate('hero.title')}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {translate('common.kojak')}
                </Box>
              </Typography>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  // onClick={() => navigate(paths.website.properties)}
                  onClick={() => toggleLanguageHandler()}
                >
                  {translate('common.exploreProperties')}
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                  borderRadius: 1,
                  mt: mdUp ? 'unset' : 2,
                  width: { md: '60%', xs: 'unset' },
                }}
              >
                {SUMMARY.map((item, index) => (
                  <Stack
                    key={item.value}
                    spacing={0.5}
                    sx={{
                      position: 'relative',
                      py: mdUp ? 5 : 2,
                    }}
                  >
                    <Typography variant="h4">{item.value}+</Typography>
                    <Typography variant="body1">{translate(`hero.${item.label}`)}</Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
