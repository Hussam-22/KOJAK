import { Box, useTheme, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

function LandingAbout() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        backgroundImage: 'url(/assets/shape/bbblurry.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="xl" sx={{ py: { md: 15, xs: 10 }, position: 'relative' }}>
        <Grid container>
          <Grid
            md={6}
            xs={12}
            sx={{
              order: !mdUp && 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: { md: 2, xs: 0 },
              borderLeft: { md: 'solid 10px #666' },
              borderRadius: 1.5,
            }}
          >
            <Typography variant="h6" color="white">
              {translate('landing.about.fortyYears')}
            </Typography>
            <Typography variant="h1" color="primary">
              {translate('landing.about.title')}
            </Typography>
            {!mdUp && (
              <Image
                src="/assets/images/original/old-car-2.png"
                alt="kojak-40-years"
                ratio="16/9"
                sx={{ borderRadius: 1, my: 2 }}
              />
            )}
            <Typography
              sx={{
                fontWeight: theme.typography.fontWeightLight,
                color: 'common.white',
                mt: theme.direction === 'rtl' ? 3 : 0,
              }}
            >
              {translate('landing.about.subTitle')}
            </Typography>
          </Grid>
          <Grid md={6}>
            <Image
              src="/assets/images/original/old-car-2.png"
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
