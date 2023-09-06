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
import { bgGradient } from 'src/theme/css';

export default function SpareParts() {
  return (
    <GroupSection
      brand="Kojak Spare-Parts"
      backgroundURL="/assets/images/group/spare-parts.jpg"
      mainText="Looking for Mercedes Genuine Spare Parts ?"
      subText="Visit Kojak Spare Part website and explore more than 10,000 genuine Mercedes-Benz spare parts"
      buttonText="Visit Spare-Parts Website"
    />
  );
}

function GroupSection({ brand, backgroundURL, mainText, subText, buttonText }) {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        ...bgGradient({
          direction: 'to right',
          startColor: `${alpha(theme.palette.grey[900], 0.9)}`,
          endColor: `${alpha(theme.palette.grey[100], 0)}`,
          imgUrl: backgroundURL,
        }),
        py: 5,
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
                <Typography variant="overline" sx={{ color: theme.palette.custom.spareParts }}>
                  {brand}
                </Typography>

                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                    lineHeight: 1.25,
                    fontWeight: theme.typography.fontWeightBold,
                    color: 'common.white',
                  }}
                >
                  {mainText}
                </Typography>
              </Box>

              <Typography sx={{ color: 'common.white' }}>{subText}</Typography>

              <Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor:
                      brand === 'Kojak Auto-Maintenance'
                        ? theme.palette.custom.auto
                        : theme.palette.custom.spareParts,
                  }}
                  // onClick={() => navigate(paths.website.bookAppointment)}
                >
                  {buttonText}
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* <Grid md={6} xs={12}> */}
          {/* </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}

GroupSection.propTypes = {
  brand: PropTypes.string,
  backgroundURL: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
  buttonText: PropTypes.string,
};
