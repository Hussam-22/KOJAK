import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  {
    title: 'Customer Satisfaction',
    description:
      ' Our customers are at the heart of everything we do. We are committed to understanding their unique needs and preferences, and we strive to exceed their expectations with personalized and attentive service',
    icon: 'carbon:chat-bot',
  },
  {
    title: 'Quality and Excellence',
    description:
      'We believe in delivering the highest standards of quality and excellence in every aspect of our properties and services. From meticulous design and construction to efficient management, we ensure that our spaces stand as symbols of enduring craftsmanship and pride',
    icon: 'carbon:3d-curve-auto-colon',
  },
  {
    title: 'Integrity and Transparency',
    description:
      'Trust is the cornerstone of our relationships with customers, partners, and employees. We uphold the highest ethical standards, ensuring transparency in all our dealings and fostering an atmosphere of mutual respect and honesty',
    icon: 'carbon:airport-location',
  },
];

// ----------------------------------------------------------------------

export default function CoreValues() {
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
          <Typography variant="h2">Core Values</Typography>

          <Typography sx={{ color: 'text.secondary', maxWidth: { md: 540 } }}>
            Join us on this transformative journey as we shape the future of living and workspaces.
            Together, we will create lasting impressions and unlock the true potential of every
            space we touch.
          </Typography>
        </Stack>

        <Grid container spacing={8}>
          {CORE_VALUES.map((value) => (
            <Grid
              key={value.title}
              xs={12}
              md={4}
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Iconify icon={value.icon} width={48} sx={{ color: 'primary.main' }} />

              <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                {value.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
