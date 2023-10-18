import Box from '@mui/material/Box';
import { Stack, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import Image from 'src/components/image';
import { useLocales } from 'src/locales';
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

export default function AboutUs() {
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: 'common.black', height: '100dvh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid md={5}>
            <Typography
              color="secondary"
              sx={{
                fontSize: '18dvh',
                fontWeight: theme.typography.fontWeightBold,
                lineHeight: 1,
                // whiteSpace: 'nowrap',

                textTransform: 'uppercase',
              }}
            >
              {translate('about.title')}
            </Typography>
            <Typography
              sx={{
                color: 'primary.main',
                fontSize: '18dvh',
                fontWeight: theme.typography.fontWeightBold,
                lineHeight: 1,
                // whiteSpace: 'nowrap',

                textTransform: 'uppercase',
              }}
            >
              {translate('common.brand')}
            </Typography>
          </Grid>
          <Grid
            md={7}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Image
              src="/assets/illustrations/engine.svg"
              height={500}
              sx={{ position: 'absolute', top: 0, zIndex: 0 }}
            />
          </Grid>
        </Grid>
        <Stack spacing={2}>
          <Typography
            color="white"
            sx={{
              fontSize: '18dvh',
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {translate('about.titleTwo')}
          </Typography>
          <Typography color="white">{translate('about.description')}</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
