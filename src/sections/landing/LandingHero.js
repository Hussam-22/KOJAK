import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { bgBlur } from 'src/theme/css';
import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function KojakBuildingLandingHero({ openAppointmentDialog }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { translate, onChangeLang, currentLang } = useLocales();

  const openAppointmentModal = () => {};

  const renderOverlay = (
    <Box
      sx={{
        backgroundColor: alpha('#000000', 0.45),
        top: 0,
        left: 0,
        // zIndex: -1,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    />
  );

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        minHeight: '-webkit-fill-available',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      >
        <Image
          src={`/assets/images/hero/hero-${currentLang.value === 'en' ? 'left' : 'right'}.png`}
          height="100dvh"
        />
      </Box>
      {!mdUp && renderOverlay}

      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Grid md={6} xs={12} />

          <Grid md={6} xs={12} sx={{ position: 'relative' }}>
            {mdUp && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '19dvw',
                    WebkitTextStroke: `1px ${alpha(theme.palette.common.white, 0.1)}`,
                    color: alpha(theme.palette.background.default, 0),
                  }}
                >
                  {currentLang.value === 'en' ? 'KOJAK' : 'كوجاك'}
                </Typography>
              </Box>
            )}
            <Stack
              sx={{
                textAlign: { md: 'left', xs: 'center' },
              }}
              spacing={3}
            >
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                  lineHeight: 1.25,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {translate('hero.heroText')}
                </Box>
                {translate('hero.title')}
              </Typography>

              <Typography>{translate('hero.subText')}</Typography>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={openAppointmentDialog}
                >
                  {translate('common.exploreProperties')}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

KojakBuildingLandingHero.propTypes = {
  // open: PropTypes.bool,
  openAppointmentDialog: PropTypes.func,
};
