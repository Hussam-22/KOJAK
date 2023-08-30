import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  'tabler:car-turbine',
  'carbon:3d-curve-auto-colon',
  'tabler:car-turbine',
  'carbon:airport-location',
];

// ----------------------------------------------------------------------

export default function CoreValues() {
  const { translate } = useLocales();
  const theme = useTheme();
  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: 8,
      }}
    >
      <Container>
        <Stack
          spacing={3}
          direction="column"
          justifyContent={{ md: 'space-between' }}
          sx={{
            mb: { xs: 4, md: 8 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">{translate('about.mission')}</Typography>

          <Typography sx={{ maxWidth: { md: 800 } }}>{translate('about.missionText')}</Typography>
        </Stack>

        <Grid container>
          <Grid md={4}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: 4 }}>
              {CORE_VALUES.slice(0, 2).map((value, index) => (
                <Box sx={{ textAlign: { md: 'left', xs: 'center' } }} key={value}>
                  <Iconify icon={value} width={48} sx={{ color: 'primary.main' }} />

                  <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                    {translate(`about.coreValues.items.${index + 1}.title`)}
                  </Typography>

                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {translate(`about.coreValues.items.${index + 1}.description`)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid md={4} sx={{ p: 2 }}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Image src="/assets/images/original/6.webp" sx={{ borderRadius: 2 }} />
              <Image src="/assets/images/original/4.webp" sx={{ borderRadius: 2 }} />
            </Stack>
          </Grid>
          <Grid md={4}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: 4 }}>
              {CORE_VALUES.slice(0, 2).map((value, index) => (
                <Box sx={{ textAlign: { md: 'right', xs: 'center' } }} key={value}>
                  <Iconify icon={value} width={48} sx={{ color: 'primary.main' }} />

                  <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                    {translate(`about.coreValues.items.${index + 3}.title`)}
                  </Typography>

                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {translate(`about.coreValues.items.${index + 3}.description`)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
