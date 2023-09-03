import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  alpha,
  Button,
  useTheme,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { bgBlur, bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';

function CustomOrder() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        ...bgGradient({
          direction: 'to right',
          startColor: `${alpha(theme.palette.grey[900], 0.9)}`,
          endColor: `${alpha(theme.palette.grey[100], 0)}`,
          imgUrl: '/assets/images/hero/custom-order.jpg',
        }),
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'left',
            height: '100%',
          }}
          spacing={3}
        >
          <Grid md={6} xs={12} sx={{ position: 'relative' }}>
            <Stack
              sx={{
                textAlign: { md: 'left', xs: 'center' },
              }}
              spacing={3}
            >
              <Box>
                <Typography variant="overline">Custom order car</Typography>
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                    lineHeight: 1.25,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  Crafting Your Dream Mercedes ?
                </Typography>
              </Box>

              <Typography>
                Are you in search of automotive excellence with a touch of personalization? Look no
                further! We are proud to offer you the opportunity to order custom Mercedes cars
                directly from Germany
              </Typography>

              {!mdUp && (
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    // onClick={() => navigate(paths.website.bookAppointment)}
                  >
                    Contact Us
                  </Button>
                </Box>
              )}
            </Stack>
          </Grid>
          {mdUp && (
            <Grid md={6}>
              <Box
                sx={{
                  ...bgBlur({ color: '#333333', opacity: 0.4, blur: 2 }),
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <ContactUsForm />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
export default CustomOrder;
// CustomOrder.propTypes = { tables: PropTypes.array };
