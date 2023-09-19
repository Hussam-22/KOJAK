import React from 'react';
import { m } from 'framer-motion';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { varZoom, varSlide, MotionViewport } from 'src/components/animate';

function InternationalBusiness() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <MotionViewport
      sx={{
        py: 8,
        bgcolor: 'background.light',
      }}
    >
      <Container maxWidth="xl" component={MotionViewport}>
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
            <m.div variants={varZoom().inUp}>
              <Image src="/assets/illustrations/illustration_map.svg" />
            </m.div>
          </Grid>

          <Grid md={8} xs={12} sx={{ p: 3 }}>
            {/* <m.div variants={varSlide().inRight}> */}
            <Stack spacing={3}>
              <m.div variants={varSlide().inLeft}>
                <Typography variant="overline" color="primary">
                  {translate('landing.international.overline')}
                </Typography>
                <Typography variant="h1" sx={{ color: 'common.black' }}>
                  {translate('landing.international.title')}
                </Typography>
              </m.div>
              <m.div variants={varSlide().inRight}>
                <Typography
                  sx={{
                    whiteSpace: 'pre-line',
                    fontWeight: theme.typography.fontWeightLight,
                    color: 'common.black',
                  }}
                  variant="h5"
                >
                  {translate('landing.international.text')}
                </Typography>
              </m.div>
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
