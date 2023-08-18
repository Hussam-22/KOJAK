import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const CORE_VALUES = ['carbon:chat-bot', 'carbon:3d-curve-auto-colon', 'carbon:airport-location'];

// ----------------------------------------------------------------------

export default function CoreValues() {
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: { xs: 8, md: 15 },
      }}
    >
      <Container>
        <Stack
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 15 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">{translate('about.coreValues.title')}</Typography>

          <Typography sx={{ color: 'text.secondary', maxWidth: { md: 540 } }}>
            {translate('about.coreValues.subTitle')}
          </Typography>
        </Stack>

        <Grid container spacing={8}>
          {CORE_VALUES.map((value, index) => (
            <Grid
              key={value}
              xs={12}
              md={4}
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Iconify icon={value} width={48} sx={{ color: 'primary.main' }} />

              <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                {translate(`about.coreValues.items.${index + 1}.title`)}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>
                {translate(`about.coreValues.items.${index + 1}.description`)}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
