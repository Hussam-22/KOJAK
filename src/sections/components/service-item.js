import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Stack, Button, useTheme, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';
import ServiceDialog from 'src/components/Dialog/service-dialog';

export default function ServiceItem({ service, major }) {
  const { serviceName, description, icon } = service;
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          ...(major && {
            borderRadius: 2,
          }),
        }}
      >
        <Stack direction={isMobile ? 'column' : 'row'} sx={{ height: 1 }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              width: isMobile ? '100%' : '80%',
              bgcolor: 'secondary.main',
              p: 2,
              borderRadius: '10px 0 0 10px',
            }}
          >
            {isMobile && (
              <Image
                src={`/assets/images/service-icons/${icon}.svg`}
                alt={serviceName}
                width="25%"
                sx={{ mb: 2, bgcolor: major && 'primary.main', borderRadius: major && 2 }}
              />
            )}
            <Typography variant={major ? 'h4' : 'h6'} color="primary">
              {translate(`services.items.${icon}.serviceName`)}
            </Typography>
            <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
              {translate(`services.items.${icon}.description`)}
            </Typography>

            {major && (
              <Box>
                <Button variant="outlined" color="inherit" onClick={() => setOpen(true)}>
                  {translate(`common.showIncluded`)}
                </Button>
              </Box>
            )}
          </Stack>

          {!isMobile && (
            <Box
              sx={{
                width: '21%',
                p: 2,
                bgcolor: major ? 'primary.main' : theme.palette.grey[600],
                borderRadius: '0 5px 5px 0',
                backgroundImage: `url(/assets/images/service-icons/${icon}.svg)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundOrigin: 'content-box',
              }}
            />
          )}
        </Stack>
      </Box>
      <ServiceDialog open={open} handleClose={handleClose} service={service} />
    </>
  );
}

ServiceItem.propTypes = {
  service: PropTypes.shape({
    serviceName: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    serviceItems: PropTypes.array,
  }),
  major: PropTypes.bool,
};
