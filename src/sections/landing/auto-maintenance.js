import PropTypes from 'prop-types';

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
import Image from 'src/components/image/Image';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function AutoMaintenance() {
  return (
    <GroupSection
      brand="Kojak Auto-Maintenance"
      backgroundURL="/assets/images/original/6.webp"
      mainText="Looking for Mercedes Auto Repair Shop ?"
      subText="Book an Appointment Online or Visit Kojak Auto-Maintenance Shop and let our expert team
                fix your car with experience since 1986 in Mercedes-Benz Cars"
      buttonText="Visit Auto-Maintenance Website"
    />
  );
}

function GroupSection({ brand, backgroundURL, mainText, subText, buttonText }) {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: 8,
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
                <Typography variant="overline" sx={{ color: 'warning.main' }}>
                  {brand}
                </Typography>

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
              </Box>

              <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                {subText}
              </Typography>

              <Box>
                <Button
                  variant="contained"
                  size="large"
                  color="warning"
                  // onClick={() => navigate(paths.website.bookAppointment)}
                >
                  {buttonText}
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid md={6} xs={12}>
            <Box>
              <Image src={backgroundURL} sx={{ borderRadius: 2 }} ratio="16/9" />
            </Box>
          </Grid>

          <Grid md={12}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
              <Typography variant="h3">Auto Maintenance Services</Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { md: 'repeat(7,1fr)', xs: 'repeat(1,1fr)' },
                  gap: 2,
                  my: 6,
                }}
              >
                {_autoRepairServices
                  .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                  .map((service) => (
                    <ServiceItem service={service} key={service.id} />
                  ))}
              </Box>
            </Box>
          </Grid>
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
