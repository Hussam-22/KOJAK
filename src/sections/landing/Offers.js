import { Box, Card, Stack, alpha, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';

const OFFERS = [
  {
    title: 'Car Inspection',
    description: 'get free car inspection prior booking online',
    icon: 'solar:clipboard-check-outline',
    price: 'Free',
  },
  {
    title: 'AC Gas Refill',
    description: 'get cool air in this hot summer by Inspecting your AC and get Gas Refill',
    icon: 'ph:fan',
    price: '80 AED',
  },
  {
    title: 'Break Replacement',
    description: 'Breaks Inspection, Replacement & Resurfacing of break pads',
    icon: 'icon-park-twotone:brake-pads',
    price: '320 AED',
  },
  {
    title: 'Computer Diagnosis',
    description: 'diagnosis your car computer for any errors and get full report',
    icon: 'solar:cpu-linear',
    price: '100 AED',
  },
];

export default function Offers() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 5,
        my: 15,
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Typography variant="h2">HOT OFFER</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 4,
            }}
          >
            {OFFERS.map((offer) => (
              <Card sx={{ bgcolor: 'primary.main', color: 'common.black', p: 3, borderRadius: 1 }}>
                <Stack spacing={1}>
                  <Iconify icon={offer.icon} width={64} />
                  <Typography variant="h4">{offer.title}</Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      WebkitTextStroke: `2px ${alpha(theme.palette.common.black, 1)}`,
                      color: alpha(theme.palette.background.default, 0),
                    }}
                  >
                    {offer.price}
                  </Typography>
                  <Typography
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: theme.typography.fontWeightLight,
                    }}
                  >
                    {offer.description}
                  </Typography>

                  <Button variant="contained" color="secondary" size="large">
                    Book your offer now!
                  </Button>

                  <Typography variant="caption" sx={{ textAlign: 'center', pt: 1 }}>
                    valid until 29-Aug-2023
                  </Typography>
                </Stack>
              </Card>
            ))}
            {/* 
          {[...Array(4)].map((_, index) => (
            <Image src={`/assets/images/offers/${index}.png`} />
          ))} */}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
