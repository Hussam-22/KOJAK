import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color/svg-color';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocales } from 'src/locales';
import { rdxFormPayload } from 'src/redux/slices/products';
import { paths } from 'src/routes/paths';

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
    <Box sx={{ py: 8, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3} sx={{ px: 1 }}>
              <Typography variant="overline" color="primary">
                {translate('landing.international.overline')}
              </Typography>
              <Typography variant="h1">{translate('landing.international.title')}</Typography>
              {!mdUp && (
                <Box sx={{ textAlign: 'center' }}>
                  <SvgColor
                    src="/assets/illustrations/illustration_map.svg"
                    sx={{ width: '80dvw', height: '80dvw' }}
                  />
                </Box>
              )}
              <Typography
                sx={{ whiteSpace: 'pre-line', fontWeight: theme.typography.fontWeightLight }}
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
            size={{ xs: 0, md: 5 }}
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
