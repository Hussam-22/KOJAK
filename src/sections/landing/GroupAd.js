import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

export default function GroupAd() {
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{ py: 15 }}>
      <Typography variant="h2">Experience the Difference</Typography>
      <Typography
        sx={{ fontWeight: theme.typography.fontWeightLight }}
      >{`At KOJAK, we're more than an auto repair shop; we're your automotive partners. Whether you need maintenance, repairs, spare parts, or a new Mercedes, you can trust us to deliver excellence and dedication.
Visit us today and explore our Mercedes spare parts and car sales showroom. Discover why Mercedes-Benz enthusiasts choose KOJAK as their trusted partner in all things Mercedes-Benz.`}</Typography>

      <Stack direction="row" spacing={4} sx={{ p: 15 }}>
        <Box sx={{ width: '50%' }}>
          <Image src="/assets/images/group/group-ad-car.png" sx={{ borderRadius: 4 }} />
        </Box>
        <Box sx={{ width: '50%' }}>
          <Image src="/assets/images/group/group-ad-car.png" sx={{ borderRadius: 4 }} />
        </Box>
      </Stack>
    </Container>
  );
}
