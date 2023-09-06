import {
  Box,
  Stack,
  Button,
  useTheme,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { useLocales } from 'src/locales';
import { useResponsive } from 'src/hooks/use-responsive';

function CustomOrder() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'secondary.dark',
        backgroundImage: 'url(/assets/mercedes-background.jpeg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        position: 'relative',
        zIndex: 0,
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
          <Grid md={5} xs={12} sx={{ position: 'relative' }}>
            <Stack
              sx={{
                textAlign: { md: 'left', xs: 'center' },
                color: 'common.white',
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

              <Box>
                <Button
                  variant="contained"
                  size="large"
                  // onClick={() => navigate(paths.website.bookAppointment)}
                >
                  Contact Us
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default CustomOrder;
// CustomOrder.propTypes = { tables: PropTypes.array };
