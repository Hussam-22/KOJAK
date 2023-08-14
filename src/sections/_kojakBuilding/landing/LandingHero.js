import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

const SUMMARY = [
  { label: 'Apartments', value: 220, color: 'warning', icon: 'bx:building-house' },
  { label: 'Happy Tenants', value: 842, color: 'success', icon: 'ion:happy-outline' },
  { label: 'Leases processed', value: 12482, color: 'info', icon: 'solar:document-outline' },
  // { label: 'Years of Experience', value: 22, color: 'error', icon: 'ri:shield-star-line' },
];

// ----------------------------------------------------------------------

export default function KojakBuildingLandingHero() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: { md: '80dvh', xs: '95dvh' },
        overflow: 'hidden',
        backgroundImage: 'url(/assets/kojak-building/shape/bbblurry.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        pt: 15,
      }}
    >
      {/* <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: -1,
        }}
      >
        <Image src="/assets/kojak-building/shape/blob-2.svg" />
      </Box> */}
      <Container maxWidth="xl">
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid md={5} xs={12} sx={{ order: mdUp ? 0 : 1 }}>
            <Stack sx={{ textAlign: { md: 'left', xs: 'center' } }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'common.black',
                }}
              >
                Looking for residential or commercial space ?
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
                Find Your Perfect Space for Living or Business Thriving with{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  KOJAK
                </Box>
              </Typography>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate(paths.website.properties)}
                >
                  Explore Properties
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { md: 'repeat(3,1fr)', xs: 'repeat(3,1fr)' },
                  borderRadius: 1,
                  mt: mdUp ? 'unset' : 2,
                }}
              >
                {SUMMARY.map((item) => (
                  <Stack
                    key={item.value}
                    spacing={0.5}
                    sx={{
                      position: 'relative',
                      py: mdUp ? 5 : 2,
                    }}
                  >
                    <Typography variant="h4">{item.value}+</Typography>
                    <Typography variant="body1">{item.label}</Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Grid>
          <Grid md={7} xs={12}>
            <Image src="/assets/kojak-building/hero/hero-charecter.svg" ratio="4/3" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
