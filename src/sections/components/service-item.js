import PropTypes from 'prop-types';

import { Box, Stack, useTheme, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ServiceItem({ service, major }) {
  const isMobile = useResponsive('down', 'md');
  const { serviceName, description, icon } = service;
  const theme = useTheme();

  return (
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
              width="25%"
              sx={{ mb: 2, bgcolor: major && 'primary.main', borderRadius: major && 2 }}
            />
          )}
          <Typography variant={major ? 'h4' : 'h6'} color="primary">
            {serviceName}
          </Typography>
          <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
            {description}
          </Typography>
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
  );
}

ServiceItem.propTypes = {
  service: PropTypes.shape({
    serviceName: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
  }),
  major: PropTypes.bool,
};
