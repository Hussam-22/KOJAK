import PropTypes from 'prop-types';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function AutoMaintenance() {
  return (
    <GroupSection
      brand="Kojak Auto-Maintenance"
      backgroundURL="/assets/images/original/6.webp"
      mainText="Visit Kojak Auto Maintenance Shop"
      subText="Book an Appointment Online or Visit Kojak Auto-Maintenance Shop and let our expert team
                fix your car with experience since 1986 in Mercedes-Benz Cars"
      buttonText="Visit Kojak Auto-Maintenance Website"
    />
  );
}

function GroupSection({ brand, backgroundURL, mainText, subText, buttonText }) {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        py: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Stack
          sx={{
            textAlign: 'center',
          }}
          spacing={3}
        >
          <Typography variant="h2">{mainText}</Typography>
          <Typography variant="body1">{subText}</Typography>

          <Box
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(7,1fr)', xs: 'repeat(2,1fr)' },
                gap: 1,
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

          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: 'custom.auto', color: 'secondary.main' }}
              // onClick={() => navigate(paths.website.bookAppointment)}
            >
              {buttonText}
            </Button>
          </Box>
        </Stack>
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
