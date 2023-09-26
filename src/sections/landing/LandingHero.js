import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack, Button, TextField, Container } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';
import getVariant from 'src/components/animate/variants/get-variant';

const LandingHero = () => {
  const mdUp = useResponsive('up', 'md');
  const { translate, currentLang } = useLocales();
  const navigate = useNavigate();
  const handleContactUsClick = () => {
    navigate(paths.website.contactUs);
  };

  return (
    <Box
      sx={{
        height: '100dvh',
        bgcolor: 'background.dark',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Grid container spacing={4} sx={{ p: 5 }}>
          <Grid md={12} xs={12}>
            <Box component={m.div} {...getVariant('fadeInUp')} sx={{ mb: 2 }}>
              <Typography variant="overline" color="primary">
                {translate('landing.hero.heroText')}
              </Typography>

              <Typography variant="h1" color="white">
                {translate('landing.hero.partOne')}
              </Typography>
            </Box>
          </Grid>

          <Grid
            md={12}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ p: 2, borderRadius: 3 }}>
              <Stack direction="row" spacing={3}>
                <TextField label="MercedesClass" />
                <TextField label="Manufacture Year" />
                <TextField label="Part Category" />

                <Button size="large" variant="contained" color="primary">
                  Search
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingHero;
