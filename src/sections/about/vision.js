import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function Vision() {
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.neutral',
      }}
    >
      <Container>
        <Grid container spacing={3}>
          {mdUp && (
            <Grid md={5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/assets/illustrations/vision.svg" />
            </Grid>
          )}
          <Grid md={7} xs={12} sx={{ p: 4 }}>
            <Stack
              spacing={3}
              direction="column"
              justifyContent={{ md: 'space-between' }}
              sx={{
                mb: { xs: 4, md: 8 },
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography variant="h2">{translate('about.vision')}</Typography>
              {!mdUp && <Image src="/assets/illustrations/vision.svg" />}
              <Typography>{translate('about.history')}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
