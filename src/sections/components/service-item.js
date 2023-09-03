import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Stack, Button, useTheme, Typography } from '@mui/material';

import { bgBlur } from 'src/theme/css';
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
          ...bgBlur({ color: '#333333', opacity: 0.4 }),
          borderRadius: 1,
        }}
      >
        <Stack
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ px: 0.5, py: 1, textAlign: 'center' }}
        >
          <Image src={`/assets/images/service-icons/${icon}.svg`} width="40%" />
          <Typography>{translate(`services.items.${icon}.serviceName`)}</Typography>
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
