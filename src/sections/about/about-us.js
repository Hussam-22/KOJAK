import { Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocales } from 'src/locales';

export default function AboutUs() {
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: 'common.black', height: '100dvh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="xl" sx={{ mx: mdUp ? 'auto' : 4, position: 'relative', pt: { xs: 5 } }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              color="secondary"
              sx={{
                fontSize: mdUp ? '18dvh' : '9dvh',
                fontWeight: theme.typography.fontWeightBold,
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              {translate('about.title')}
            </Typography>
            <Typography
              sx={{
                color: 'primary.main',
                fontSize: mdUp ? '18dvh' : '9dvh',
                fontWeight: theme.typography.fontWeightBold,
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              {translate('common.brand')}
            </Typography>
          </Grid>
        </Grid>
        <Stack spacing={2}>
          <Typography
            color="white"
            sx={{
              fontSize: mdUp ? '18dvh' : '9dvh',
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {translate('about.titleTwo')}
          </Typography>
          <Typography color="white">{translate('about.description')}</Typography>
        </Stack>

        {mdUp && (
          <Box sx={{ position: 'absolute', top: 0, right: 0, zIndex: 0 }}>
            <Image
              src="/assets/illustrations/engine.svg"
              height={mdUp ? 500 : 300}
              alt="engine vector drawing"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
