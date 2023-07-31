import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import CountUp from 'src/components/count-up/count-up';
import { useResponsive } from 'src/hooks/use-responsive';
import { varFade, MotionViewport } from 'src/components/animate';
import getVariant from 'src/sections/examples/animate-view/get-variant';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  {
    title: 'Transparent Transactions',
    description:
      'Our commitment to transparent transactions ensures that you have a clear understanding of all the terms and conditions, empowering you to make decisions with confidence',
    icon: 'icon-park-outline:doc-success',
  },
  {
    title: 'Customer Satisfaction',
    description: `Over the years, we've built a reputation for excellence, and our countless satisfied clients stand as a testament to our commitment to customer happiness`,
    icon: 'carbon:chat-bot',
  },
  {
    title: 'Prime Locations',
    description: `Our portfolio includes spaces in prime and sought-after locations, offering you the benefits of accessibility, convenience, and a thriving community`,
    icon: 'fluent:location-48-regular',
  },
];

const SUMMARY = [
  { label: 'Apartments', value: 220, color: 'warning', icon: 'bx:building-house' },
  { label: 'Happy Tenants', value: 1192, color: 'success', icon: 'ion:happy-outline' },
  { label: 'Years of Experience', value: 22, color: 'error', icon: 'ri:shield-star-line' },
  { label: 'Total Leases processed', value: 12482, color: 'info', icon: 'solar:document-outline' },
];

// ----------------------------------------------------------------------

export default function WhyKojakBuilding() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <MotionViewport disableAnimatedMobile>
        <Box
          component={m.div}
          variants={varFade().inRight}
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
            mx: 'auto',
            gap: 4,
            my: 5,
          }}
        >
          {SUMMARY.map((item) => (
            <Stack
              key={item.value}
              spacing={0.5}
              sx={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                py: 5,
                boxShadow: `5px 5px 2px 2px ${theme.palette.primary.lighter}`,
                borderRadius: 2,
              }}
            >
              <Iconify icon={item.icon} width={48} />
              <Typography variant="h3">{item.value}+</Typography>
              <Typography variant="h6">{item.label}</Typography>
            </Stack>
          ))}
        </Box>

        <Grid container spacing={4} component={m.div} variants={varFade().inLeft}>
          {mdUp && (
            <Grid xs={12} md={6} sx={{ p: 10 }}>
              <Image
                src="https://images.pexels.com/photos/3769312/pexels-photo-3769312.jpeg?auto=compress&cs=tinysrgb&w=1600"
                ratio="3/4"
                sx={{ borderRadius: 3, border: `solid 6px ${theme.palette.primary.main}` }}
              />
            </Grid>
          )}
          <Grid xs={12} md={6}>
            <Stack
              spacing={3}
              direction="column"
              justifyContent={{ md: 'space-between' }}
              sx={{
                my: 10,
                textAlign: 'center',
              }}
            >
              <Typography variant="h2" sx={{ textTransform: 'capitalize', zIndex: 2 }}>
                why you should choose us
              </Typography>

              <Typography sx={{ zIndex: 2 }}>
                Choosing the right partner for your space-hunting journey can make all the
                difference. At{' '}
                <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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

                  <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                    {value.title}
                  </Typography>

                  <Typography>{value.description}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MotionViewport>
    </Container>
  );
}
