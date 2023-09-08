import PropTypes from 'prop-types';

import { Stack, useTheme, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ServiceItem({ service }) {
  const { icon } = service;
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');
  const { translate } = useLocales();

  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ px: 0.5, py: 1, textAlign: 'center' }}
    >
      <Image src={`/assets/images/service-icons/${icon}.svg`} width="25%" />
      <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
        {translate(`services.items.${icon}.serviceName`)}
      </Typography>
    </Stack>
  );
}

ServiceItem.propTypes = {
  service: PropTypes.shape({
    serviceName: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    serviceItems: PropTypes.array,
  }),
};
