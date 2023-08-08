import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useResponsive } from 'src/hooks/use-responsive';

const SUMMARY = [
  { label: 'Apartments', value: 220, color: 'warning', icon: 'bx:building-house' },
  { label: 'Happy Tenants', value: 1192, color: 'success', icon: 'ion:happy-outline' },
  { label: 'Years of Experience', value: 22, color: 'error', icon: 'ri:shield-star-line' },
  { label: 'Total Leases processed', value: 12482, color: 'info', icon: 'solar:document-outline' },
];
// ----------------------------------------------------------------------

export default function KojakBuildingLandingHero() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  // const scrollToElement = () => {
  //   document.getElementById('scrollHere').scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <Box
      sx={{
        height: '100dvh',
        overflow: 'hidden',
        backgroundImage: {
          md: 'url(/assets/kojak-building/hero/hero-img-4.jpg)',
          xs: 'url(/assets/kojak-building/hero/hero-img-3.jpg)',
        },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ width: { md: '50%', xs: '100%' }, textAlign: { md: 'left', xs: 'center' } }}>
          <Stack>
            <Typography variant="overline" sx={{ color: 'common.black' }}>
              Looking for residential or commercial space ?
            </Typography>

            <Typography variant="h1" sx={{ mb: 3, textTransform: 'capitalize' }}>
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
                Explore Available Properties
              </Button>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
              }}
            >
              {SUMMARY.map((item) => (
                <Stack
                  key={item.value}
                  spacing={0.5}
                  sx={{
                    position: 'relative',
                    py: 5,
                  }}
                >
                  <Typography variant="h4">{item.value}+</Typography>
                  <Typography variant="body1">{item.label}</Typography>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
