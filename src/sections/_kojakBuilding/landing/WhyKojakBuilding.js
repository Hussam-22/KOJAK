import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Card, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image/Image';
import { MotionViewport } from 'src/components/animate';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  {
    title: 'Transparent Transactions',
    description:
      'Our commitment to transparent transactions ensures that you have a clear understanding of all the terms and conditions, empowering you to make decisions with confidence',
    image: 'Transparent_Transactions',
  },
  {
    title: 'Customer Satisfaction',
    description: `Over the years, we've built a reputation for excellence, and our countless satisfied clients stand as a testament to our commitment to customer happiness`,
    image: 'Customer_Satisfaction',
  },
  {
    title: 'Prime Locations',
    description: `Our portfolio includes spaces in prime and sought-after locations, offering you the benefits of accessibility, convenience, and a thriving community`,
    image: 'Prime_Locations',
  },
  {
    title: 'Unbeatable Prices',
    description: `Our priority is to provide you with exceptional value. We understand that finding a quality rental at a great price is essential, and we're committed to making that a reality for you.`,
    image: 'Unbeatable_Prices',
  },
];

// ----------------------------------------------------------------------

export default function WhyKojakBuilding() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  return (
    <Container maxWidth="xl" sx={{ my: 15 }}>
      <MotionViewport disableAnimatedMobile>
        <Stack
          spacing={3}
          direction="column"
          justifyContent={{ md: 'space-between' }}
          sx={{
            my: 8,
            maxWidth: '60%',
          }}
        >
          <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
            why you should choose us
          </Typography>

          <Typography>
            Choosing the right partner for your space-hunting journey can make all the difference.
            At{' '}
            <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Kojak Building
            </Box>{' '}
            , we stand out as the ultimate destination for finding your ideal residential or
            commercial space. Here&#39;s why you should choose us
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
            gap: 3,
          }}
        >
          {CORE_VALUES.map((value) => (
            <Card
              key={value.title}
              sx={{
                textAlign: 'center',
                p: 3,
                bgcolor: 'primary.lighter',
              }}
            >
              <Image
                src={`/assets/kojak-building/illustration/${value.image}.svg`}
                alt={value.image}
              />

              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                {value.title}
              </Typography>

              <Typography>{value.description}</Typography>
            </Card>
          ))}
        </Box>
      </MotionViewport>
    </Container>
  );
}
