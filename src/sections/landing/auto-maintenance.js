import { Box, Stack, Button, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { _autoRepairServices } from 'src/_mock';
import ServiceItem from 'src/sections/components/service-item';

export default function AutoMaintenance() {
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
          <Typography variant="h2">{translate('landing.auto.mainText')}</Typography>
          <Typography variant="body1">{translate('landing.auto.subText')}</Typography>

          <Box
            sx={{
              borderRadius: 2,
              px: 1,
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
              {translate('landing.auto.buttonText')}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
