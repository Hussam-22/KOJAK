import React from 'react';
import { m } from 'framer-motion';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';

function InternationalBusiness() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.neutral',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid md={7} xs={12} sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="overline" color="primary">
                {translate('landing.international.overline')}
              </Typography>
              <Typography variant="h1">{translate('landing.international.title')}</Typography>
              <Typography
                sx={{
                  whiteSpace: 'pre-line',
                  fontWeight: theme.typography.fontWeightLight,
                }}
                variant="h5"
              >
                {translate('landing.international.text')}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                size="large"
                // sx={{ color: 'secondary.main' }}
                endIcon={<Iconify icon="la:headset" width={32} height={32} />}
              >
                Contact our Export/Import Team
              </Button>
            </Stack>
          </Grid>
          <Grid
            md={5}
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Image src="/assets/images/misc/import-export.png" />
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
