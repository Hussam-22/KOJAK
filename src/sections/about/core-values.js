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
  'carbon:badge',
  'solar:shield-up-linear',
  'arcticons:mercedes-me',
  'tabler:star',
];

// ----------------------------------------------------------------------

export default function CoreValues() {
  const { translate } = useLocales();
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.neutral',
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

          <Typography>{translate('about.missionText')}</Typography>
        </Stack>

        <Grid container spacing={3}>
          {/* <Grid md={5} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/assets/images/original/1.webp" sx={{ borderRadius: 2 }} ratio="9/16" />
          </Grid> */}
          <Grid md={4} xs={12} sx={{ p: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: 4 }}>
              {CORE_VALUES.slice(0, 2).map((value, index) => (
                <Box sx={{ textAlign: 'center' }} key={value}>
                  <Iconify icon={value} width={48} sx={{ color: 'primary.main' }} />

                  <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                    {translate(`about.coreValues.items.${index + 1}.title`)}
                  </Typography>

                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {translate(`about.coreValues.items.${index + 1}.description`)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid md={4} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/assets/mercedes-background.jpeg" sx={{ borderRadius: 2 }} ratio="9/16" />
          </Grid>

          <Grid md={4} xs={12} sx={{ p: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', gap: 4 }}>
              {CORE_VALUES.slice(0, 2).map((value, index) => (
                <Box sx={{ textAlign: 'center' }} key={value}>
                  <Iconify
                    icon={CORE_VALUES[index + 2]}
                    width={48}
                    sx={{ color: 'primary.main' }}
                  />

                  <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
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
