import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { MotionViewport } from 'src/components/animate';

function InternationalBusiness() {
  const theme = useTheme();

  return (
    <MotionViewport
      sx={{
        py: 8,
        bgcolor: 'background.light',
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            md={4}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            {/* <m.div variants={varSlide().inLeft}> */}
            <Image src="/assets/illustrations/illustration_map.svg" />
            {/* </m.div> */}
          </Grid>

          <Grid md={8} xs={12} sx={{ p: 3 }}>
            {/* <m.div variants={varSlide().inRight}> */}
            <Stack spacing={3}>
              <Box>
                <Typography variant="overline" color="primary">
                  International Business
                </Typography>
                <Typography variant="h1" sx={{ color: 'common.black' }}>
                  Global Reach, Local Excellence
                </Typography>
              </Box>
              <Typography
                sx={{
                  whiteSpace: 'pre-line',
                  fontWeight: theme.typography.fontWeightLight,
                  color: 'common.black',
                }}
                variant="h5"
              >
                {`At Kojak Group, our commitment to Mercedes-Benz excellence knows no borders. With a proud tradition of delivering the very best in cars and spare parts, we extend our reach far beyond our local roots.

            Our international business division is dedicated to bringing the elegance of Mercedes-Benz to discerning customers worldwide. Through meticulous export processes and a global network of partners, we ensure that the spirit of Mercedes-Benz finds its way to you, wherever you may be.

            Whether you seek the allure of a Mercedes-Benz vehicle or require genuine spare parts for your prized possession, Kojak Group is your trusted partner in the global pursuit of luxury and automotive sophistication.

            Join us in the pursuit of international excellence. Experience Mercedes-Benz the Kojak way, no matter where your journey takes you`}
              </Typography>
            </Stack>
            {/* </m.div> */}
          </Grid>
        </Grid>
      </Container>
    </MotionViewport>
  );
}

InternationalBusiness.propTypes = {
  // Add your prop types here if needed
};

export default InternationalBusiness;
