import React from 'react';
import { m } from 'framer-motion';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { varZoom, varSlide, MotionViewport } from 'src/components/animate';

function InternationalBusiness() {
  const theme = useTheme();
  const { translate, currentLang } = useLocales();

  return (
    <Box
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
            <Image
              src="/assets/illustrations/illustration_map.svg"
              alt="globe vector"
              sx={{ width: { xs: 250, sm: 500 }, height: { xs: 200, sm: 400 } }}
            />
          </Grid>

          <Grid md={8} xs={12} sx={{ p: 3 }}>
            {/* <m.div variants={varSlide().inRight}> */}
            <Stack spacing={3}>
              <Typography variant="overline" color="primary">
                {translate('landing.international.overline')}
              </Typography>
              <Typography variant="h1" sx={{ color: 'common.black' }}>
                {translate('landing.international.title')}
              </Typography>
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
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

InternationalBusiness.propTypes = {
  // Add your prop types here if needed
};

export default InternationalBusiness;
