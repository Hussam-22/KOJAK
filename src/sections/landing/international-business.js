import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';
import SvgColor from 'src/components/svg-color/svg-color';
import { rdxFormPayload } from 'src/redux/slices/products';

function InternationalBusiness() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onContactUsClick = () => {
    dispatch(rdxFormPayload({ subject: 'I would like to inquire about international shipping' }));
    navigate(paths.website.contactUs);
  };

  return (
    <Box
      sx={{
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid md={7} xs={12}>
            <Stack spacing={3} sx={{ px: 1 }}>
              <Typography variant="overline" color="primary">
                {translate('landing.international.overline')}
              </Typography>
              <Typography variant="h1">{translate('landing.international.title')}</Typography>
              {!mdUp && <Image src="/assets/illustrations/illustration_map.svg" />}
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
                onClick={onContactUsClick}
                endIcon={<Iconify icon="la:headset" width={32} height={32} />}
              >
                Contact our Export/Import Team
              </Button>
            </Stack>
          </Grid>
          <Grid
            md={5}
            xs={0}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <SvgColor
              src="/assets/illustrations/illustration_map.svg"
              sx={{ width: 1, height: 1 }}
            />
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
