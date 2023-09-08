import { Box, alpha, useTheme, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

function LandingAbout() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box sx={{ bgcolor: 'secondary.main', px: 2 }}>
      <Container maxWidth="xl" sx={{ py: 15, position: 'relative' }}>
        {mdUp && (
          <Typography
            sx={{
              top: 0,
              position: 'absolute',
              fontSize: { md: '10dvw', xs: '18dvw' },
              WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 0.45)}`,
              color: alpha(theme.palette.background.default, 0),
              zIndex: 0,
            }}
          >
            40 YEARS
          </Typography>
        )}
        <Grid container spacing={4}>
          <Grid
            md={6}
            xs={12}
            sx={{
              order: !mdUp && 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h1" color="primary">
              About us
            </Typography>
            <Typography
              sx={{
                fontWeight: theme.typography.fontWeightLight,
                color: 'common.white',
              }}
            >{`For over four decades, Kojak-Exclusive has proudly served as a trusted destination for Mercedes enthusiasts. With a legacy spanning 40 years, our commitment to excellence in the world of luxury automobiles has only grown stronger. We've witnessed the evolution of Mercedes-Benz vehicles and have been privileged to be part of countless journeys, delivering dreams on wheels to our valued customers. Our enduring experience is a testament to Kojak-Exclusive's dedication to providing exceptional service, expertise, and a passion for all things Mercedes. As we continue this journey, we look forward to another 40 years of bringing the epitome of luxury to our cherished clients.`}</Typography>
          </Grid>
          <Grid md={6} xs={12}>
            <Image
              src="/assets/images/original/old-car-2.webp"
              alt="kojak-40-years"
              ratio="16/9"
              sx={{ borderRadius: 1 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default LandingAbout;
// LandingAbout.propTypes = { tables: PropTypes.array };
