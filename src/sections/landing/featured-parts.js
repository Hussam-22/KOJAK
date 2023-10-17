import React from 'react';
import { m } from 'framer-motion';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Card, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

const FEATURED_PARTS = [
  {
    imageUrl: '/assets/images/parts/engine-service-kit.webp',
    description: `Genuine Mercedes Service Kit E Class w213 OM654 DIESEL engine oil and filters -
  service kit`,
    partNo: 'A000121',
  },
  {
    imageUrl: '/assets/images/parts/gearbox-service-kit.webp',
    description: `Genuine Mercedes-Benz 722.9 Automatic gearbox oil (BLUE) kit for reduced friction gearbox A89 code`,
    partNo: 'A000122',
  },
  {
    imageUrl: '/assets/images/parts/brake-service-kit.webp',
    description: `Disk & Brake Pad Front/Rear Complete Service Kit - Mercedes-Benz`,
    partNo: 'A000123',
  },
  {
    imageUrl: '/assets/images/parts/ac-kit.webp',
    description: `Cabin Air Filter Cleaning Kit`,
    partNo: 'A000124',
  },
];

function FeaturedParts() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box sx={{ py: 15 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid md={12}>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Box>
                <Typography variant="overline" color="primary">
                  Service Kits
                </Typography>
                <Typography variant="h1" color="white">
                  Experience Peak Performance with Our Premium Mercedes-Benz Service Kits
                </Typography>
              </Box>

              <Typography>
                {`Elevate your driving experience and ensure your Mercedes-Benz operates at its best
              with our meticulously designed service kits. Crafted to meet the exacting standards of
              Mercedes-Benz engineering, our premium kits offer a seamless blend of precision and
              quality. Maintain your luxury car's top-tier performance, all while enjoying the peace
              of mind that comes with our specialized service solutions. Explore our range of
              service kits and give your Mercedes the care it deserves.`}
              </Typography>
            </Stack>
          </Grid>
          {FEATURED_PARTS.map((item) => (
            <Grid key={item.partNo} md={3} xs={6}>
              <Card
                sx={{
                  height: 1,
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Image src={item.imageUrl} sx={{ borderRadius: 1 }} ratio="3/4" />
                <Typography sx={{ p: 2, alignSelf: 'center' }}>{item.description}</Typography>
                <Button variant="contained" color="primary">
                  More Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturedParts;
