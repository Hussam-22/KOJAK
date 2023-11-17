import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const SUMMARY = [
  { name: 'fact1', number: 40 },
  { name: 'fact2', number: 3022 },
  { name: 'fact3', number: 8450 },
  { name: 'fact4', number: 50 },
];

// ----------------------------------------------------------------------

const StyledSection = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(10),
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    right: 0,
    width: '75%',
    left: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    width: '50%',
  },
}));

// ----------------------------------------------------------------------

export default function AboutUs() {
  const { translate, currentLang } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box sx={{ bgcolor: 'primary.lighter' }}>
      <Container
        maxWidth="xl"
        sx={{
          pt: 5,
          pb: { xs: 5, md: 10 },
        }}
      >
        <Grid container spacing={3}>
          <Grid
            md={8}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              order: mdUp ? 0 : 1,
            }}
          >
            <Typography variant="h1" sx={{ textAlign: 'center', mb: 2 }}>
              {translate('about.title')}
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>{translate('about.description')}</Typography>
          </Grid>

          <Grid md={4} xs={12}>
            <Box sx={{ textAlign: 'center' }}>
              <Image
                src="/assets/mercedes-logo.svg"
                alt="mercedes-logo"
                sx={{ width: 175, height: 175 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
