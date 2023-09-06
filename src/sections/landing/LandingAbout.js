import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  alpha,
  Button,
  useTheme,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { bgBlur, bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';

function LandingAbout() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        ...bgGradient({
          direction: 'to right',
          startColor: `${alpha(theme.palette.grey[900], 1)}`,
          endColor: `${alpha(theme.palette.grey[100], 0)}`,
          imgUrl: '/assets/images/hero/old-mercedes.jpg',
        }),
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'left',
            height: '100%',
          }}
        >
          <Grid xs={12} sx={{ position: 'relative', px: 3 }}>
            <Typography
              sx={{
                fontSize: '8dvw',
                WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 0.8)}`,
                color: alpha(theme.palette.background.default, 0),
              }}
            >
              40 YEARS
            </Typography>
            <Typography variant="h2" sx={{ color: 'common.white' }}>
              About us
            </Typography>
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: theme.typography.fontWeightLight,
                color: 'common.white',
              }}
            >{`For over four decades, Kojak-Exclusive has proudly served as a trusted destination for Mercedes enthusiasts. With a legacy spanning 40 years, our commitment to excellence in the world of luxury automobiles has only grown stronger. We've witnessed the evolution of Mercedes-Benz vehicles and have been privileged to be part of countless journeys, delivering dreams on wheels to our valued customers. Our enduring experience is a testament to Kojak-Exclusive's dedication to providing exceptional service, expertise, and a passion for all things Mercedes. As we continue this journey, we look forward to another 40 years of bringing the epitome of luxury to our cherished clients.`}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default LandingAbout;
// LandingAbout.propTypes = { tables: PropTypes.array };
