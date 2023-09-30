import React from 'react';
import { m } from 'framer-motion';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { varZoom, varSlide, MotionViewport } from 'src/components/animate';

function FixOffer() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl" sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid md={6} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack spacing={2}>
              <Typography variant="h1" color="secondary">
                5% Discount
              </Typography>
              <Typography variant="h5" color="secondary">
                Get 5% discount on Spare Parts price when you chose to Fix/Install Spare Part by our
                Auto Maintenance Shop
              </Typography>
              <Box>
                <Button variant="contained">Book an Appointment</Button>
              </Box>
            </Stack>
          </Grid>
          <Grid md={6} xs={12}>
            <Image
              src="https://cdnb.artstation.com/p/assets/images/images/054/299/461/large/roman-tikhonov-05-15-03.jpg?1664222669"
              ratio="21/9"
              sx={{ borderRadius: 1 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FixOffer;
