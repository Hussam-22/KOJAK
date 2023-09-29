import React from 'react';
import { m } from 'framer-motion';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

function FeaturedParts() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box sx={{ py: 15, bgcolor: 'common.black' }}>
      <Container maxWidth="xl">
        <Typography variant="overline" color="primary">
          Featured Parts
        </Typography>
        <Grid container spacing={6}>
          <Grid md={12} xs={12}>
            <Stack spacing={3}>
              <Typography variant="h1" color="white">
                Rims Collection
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
                <Image
                  src="https://cdna.artstation.com/p/assets/images/images/051/642/330/large/roman-tikhonov-ps5-245-6.jpg?1657802314"
                  sx={{ borderRadius: 1 }}
                />
                <Image
                  src="https://cdna.artstation.com/p/assets/images/images/065/330/774/large/roman-tikhonov-main.jpg?1690116976"
                  sx={{ borderRadius: 1 }}
                />
                <Image
                  src="https://cdna.artstation.com/p/assets/images/images/061/027/634/large/roman-tikhonov-cup2r-285-5.jpg?1679861692"
                  sx={{ borderRadius: 1 }}
                />
                <Image
                  src="https://cdna.artstation.com/p/assets/images/images/061/536/694/large/roman-tikhonov-375-7.jpg?1681058407"
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            </Stack>
          </Grid>

          <Grid md={12} xs={12}>
            <Stack spacing={3}>
              <Typography variant="h1" color="white">
                Consumables Collection
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
                <Image
                  src="https://cdnb.artstation.com/p/assets/images/images/021/332/465/large/shakil-jamal-automotive-battery-preview-03.jpg?1571257921"
                  sx={{ borderRadius: 1 }}
                />
                <Image
                  src="https://cdna.artstation.com/p/assets/images/images/030/284/104/large/mohammx-dastan-sunoco-galon-insta-01-00000.jpg?1600152903"
                  sx={{ borderRadius: 1 }}
                />
                <Image
                  src="https://cdnb.artstation.com/p/assets/images/images/046/235/675/large/roberts-s-of2k.jpg?1644606316"
                  sx={{ borderRadius: 1 }}
                />
                <Image
                  src="https://cdnb.artstation.com/p/assets/images/images/029/936/475/large/alex-tsekot-presentation-main-thumb.jpg?1599079970"
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturedParts;
