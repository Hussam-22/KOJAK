import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  {
    title: 'Transparent Transactions',
    description:
      'Transparency and honesty are the cornerstones of our service. Our commitment to transparent transactions ensures that you have a clear understanding of all the terms and conditions, empowering you to make decisions with confidence',
    icon: 'icon-park-outline:doc-success',
  },
  {
    title: 'Customer Satisfaction',
    description: `Your satisfaction is our ultimate goal. Over the years, we've built a reputation for excellence, and our countless satisfied clients stand as a testament to our commitment to customer happiness`,
    icon: 'carbon:chat-bot',
  },
  {
    title: 'Prime Locations',
    description: `Location is key when it comes to finding the perfect space. Our portfolio includes spaces in prime and sought-after locations, offering you the benefits of accessibility, convenience, and a thriving community`,
    icon: 'fluent:location-48-regular',
  },
];

// ----------------------------------------------------------------------

export default function WhyKojakBuilding() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 15 },
        mt: { xs: 1, md: 3 },
        backgroundColor: 'secondary.main',
        zIndex: -2,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          left: 0,
          width: 1,
        }}
      >
        <Image src="/assets/kojak-building/shape/layered-waves.svg" width={1} />
      </Box>
      <Container maxWidth="xl">
        <Stack
          spacing={3}
          direction={{ xs: 'row', md: 'column' }}
          justifyContent={{ md: 'space-between' }}
          sx={{
            mb: 10,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2" sx={{ textTransform: 'capitalize', zIndex: 2 }} color="white">
            why you should choose us
          </Typography>

          <Typography color="white" sx={{ zIndex: 2 }}>
            Choosing the right partner for your space-hunting journey can make all the difference.
            At{' '}
            <Box component="span" sx={{ fontWeight: 'bold', color: 'custom.bluishPurpleLight' }}>
              Kojak Building
            </Box>{' '}
            , we stand out as the ultimate destination for finding your ideal residential or
            commercial space. Here&#39;s why you should choose us
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {CORE_VALUES.map((value) => (
            <Grid
              key={value.title}
              xs={12}
              md={4}
              sx={{
                textAlign: 'center',
              }}
            >
              <Iconify icon={value.icon} width={48} sx={{ color: 'primary.main' }} />

              <Typography variant="h5" sx={{ mt: 2, mb: 2 }} color="white">
                {value.title}
              </Typography>

              <Typography sx={{ color: 'custom.bluishPurpleLight' }}>
                {' '}
                {value.description}{' '}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
