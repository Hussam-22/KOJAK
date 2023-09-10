import { Box, alpha, useTheme, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

function LandingAbout() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box sx={{ bgcolor: 'secondary.main', px: 1 }}>
      <Container maxWidth="xl" sx={{ py: { md: 15, xs: 10 }, position: 'relative' }}>
        {mdUp && (
          <Typography
            sx={{
              top: 20,
              position: 'absolute',
              fontSize: '8dvw',
              WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 0.25)}`,
              color: alpha(theme.palette.background.default, 0),
              zIndex: 0,
            }}
          >
            {translate('landing.about.fortyYears')}
          </Typography>
        )}
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
            }}
          >
            <Typography variant="h1" color="primary">
              {translate('landing.about.title')}
            </Typography>
            {!mdUp && (
              <Image
                src="/assets/images/original/old-car-2.webp"
                alt="kojak-40-years"
                ratio="16/9"
                sx={{ borderRadius: 1, my: 2 }}
              />
            )}
            <Typography
              sx={{
                fontWeight: theme.typography.fontWeightLight,
                color: 'common.white',
              }}
            >
              {translate('landing.about.subTitle')}
            </Typography>
          </Grid>
          <Grid md={6}>
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
