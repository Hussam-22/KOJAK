import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  'tabler:car-turbine',
  'carbon:3d-curve-auto-colon',
  'tabler:car-turbine',
  'carbon:airport-location',
];

// ----------------------------------------------------------------------

export default function Vision() {
  const { translate } = useLocales();
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'primary.lighter',
      }}
    >
      <Container>
        <Grid container spacing={3}>
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

              <Typography>{translate('about.history')}</Typography>
            </Stack>
          </Grid>
          <Grid md={5} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/assets/images/original/2.jpg" sx={{ borderRadius: 2 }} ratio="16/9" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
