import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/material/styles';

import { useLocales } from 'src/locales';
import { bgGradient } from 'src/theme/css';
import CountUp from 'src/components/count-up';

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
  const { translate } = useLocales();
  const theme = useTheme();
  return (
    <Container
      sx={{
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h1" sx={{ textAlign: 'center', mb: 2 }}>
        {translate('about.title')}
      </Typography>
      <Typography sx={{ textAlign: 'center' }}>{translate('about.description')}</Typography>

      <Box
        sx={{
          mt: 4,
          position: 'relative',
          height: 500,
          ...bgGradient({
            direction: 'to top',
            startColor: `${alpha(theme.palette.grey[900], 0.6)}`,
            endColor: `${alpha(theme.palette.grey[100], 0)}`,
            imgUrl: '/assets/images/original/font-en.jpg',
          }),
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            width: '100%',
            gap: 5,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          {SUMMARY.map((value) => (
            <Stack key={value.name} spacing={1}>
              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                <CountUp
                  start={value.number / 5}
                  end={value.number}
                  formattingFn={(newValue) => newValue}
                />

                <Typography variant="h3" component="span" sx={{ verticalAlign: 'top', ml: 0.5 }}>
                  +
                </Typography>
              </Typography>

              <Typography variant="h6" sx={{ color: 'common.white' }}>
                {translate(`why.${value.name}`)}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
