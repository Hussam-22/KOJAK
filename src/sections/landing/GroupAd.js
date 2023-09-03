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
import GroupCard from 'src/sections/components/group-card';

export default function GroupAd() {
  return (
    <>
      <GroupSection
        backgroundURL="/assets/images/group/auto-maintenance.jpg"
        mainText="Looking for Mercedes Auto Repair Shop ?"
        subText="Book and Appointment or Visit Kojak Auto-Maintenance Shop and let our expert team
                fix your car with experience since 1986 in Mercedes-Benz Cars"
      />
      <GroupSection
        backgroundURL="/assets/images/group/spare-parts.jpg"
        mainText="Looking for Mercedes Genuine Spare Parts ?"
        subText="Visit Kojak Spare Part website and explore more than 10,000 genuine Mercedes-Benz spare parts"
      />
    </>
  );
}

function GroupSection({ backgroundURL, mainText, subText }) {
  const theme = useTheme();
  const { translate } = useLocales();
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
          imgUrl: backgroundURL,
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
        >
          <Grid md={6} xs={12} sx={{ position: 'relative' }}>
            <Stack
              sx={{
                textAlign: { md: 'left', xs: 'center' },
              }}
              spacing={3}
            >
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  fontSize: { lg: '3.55rem', md: '2.55rem', xs: '1.75rem' },
                  lineHeight: 1.25,
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                {mainText}
              </Typography>

              <Typography>{subText}</Typography>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  // onClick={() => navigate(paths.website.bookAppointment)}
                >
                  {translate('common.bookAppointment')}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

GroupSection.propTypes = {
  backgroundURL: PropTypes.string,
  mainText: PropTypes.string,
  subText: PropTypes.string,
};
