import Box from '@mui/material/Box';
import { Stack, Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function WhatWeOffer() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        overflow: 'hidden',
        py: 15,
      }}
    >
      <Container
        sx={{
          //   ...bgGradient({
          //     direction: '115deg',
          //     startColor: `${alpha(theme.palette.custom.peach, 0.1)} 30%`,
          //     endColor: `${alpha(theme.palette.custom.peach, 0.2)} 100%`,
          //   }),
          //   border:'solid 2px #000000',
          py: 15,
          //   mt: 12,
          display: { md: 'flex' },
          alignItems: { md: 'center' },
          height: { md: `80vh` },
        }}
        maxWidth="xl"
      >
        <Grid container columnSpacing={{ xs: 0, md: 5 }}>
          {mdUp && (
            <>
              <Grid xs={12} md={3}>
                <Image
                  visibleByDefault
                  disabledEffect
                  alt="marketing market"
                  src="https://images.unsplash.com/photo-1595774232963-09bb75f8366a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHJlc2lkZW50aWFsJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  ratio="9/16"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
              <Grid xs={12} md={3}>
                <Image
                  visibleByDefault
                  disabledEffect
                  alt="marketing market"
                  src="https://images.unsplash.com/photo-1509828787-2c5222ed78ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  ratio="9/16"
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            </>
          )}

          <Grid
            xs={12}
            md={6}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h2" sx={{ my: 3, textTransform: 'capitalize' }}>
              We offer a variety of residential and commercial spaces
            </Typography>

            <Typography>
              At{' '}
              <Box component="span" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                Kojak Building
              </Box>{' '}
              , we take pride in offering an extensive selection of both commercial and residential
              spaces that cater to all your needs. Whether you&#39;re looking to upgrade your
              business headquarters or find a cozy abode to call home, we&#39;ve got you covered.
            </Typography>

            <Stack
              spacing={3}
              direction={{ xs: 'column', md: 'row' }}
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ pt: { md: 5 } }}
            >
              <Stack>
                <Typography variant="body2">Dubai</Typography>
                <Typography variant="body2">Motor City</Typography>
              </Stack>
              <Stack>
                <Typography variant="body2">Sharjah</Typography>
                <Typography variant="body2">Al Qasimeyah</Typography>
              </Stack>
              <Stack>
                <Typography variant="body2">Sharjah</Typography>
                <Typography variant="body2">Industrial Area 1</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
