import { useNavigate } from 'react-router';

import { useTheme } from '@mui/material/styles';
import { Box, Stack, Button, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { bgBlur } from 'src/theme/css';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function KojakBuildingLandingHero() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100dvh',
        overflow: 'hidden',
        bgcolor: '#000',
        backgroundImage: 'url(/assets/kojak-building/hero/hero-3.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        position: 'relative',
        width: 1,
        zIndex: 0,
      }}
    >
      <Container maxWidth="xl" sx={{ my: 20 }}>
        <Grid container>
          <Grid md={4}>
            <Stack spacing={3}>
              <Typography
                variant="h1"
                sx={{
                  color: '#FFF',
                }}
              >
                LET THE DOCTOR FIX YOUR CAR WITH KOJAK AUTO-MAINTENANCE
              </Typography>
              <Box>
                <Button variant="outlined" color="primary" size="large">
                  Book an Appointment
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid md={6}> </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
