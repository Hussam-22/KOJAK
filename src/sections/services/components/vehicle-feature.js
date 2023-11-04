import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

import { Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------------
export default function VehicleFeature({ icon, value, large }) {
  const theme = useTheme();
  const iconSize = large ? 32 : 24;
  const fontVariant = large ? 'h6' : 'body2';
  return (
    <Stack justifyContent="center" alignItems="center" spacing={1}>
      <Iconify icon={icon} width={iconSize} height={iconSize} />

      <Typography
        variant={fontVariant}
        sx={{ fontWeight: large ? 'unset' : theme.typography.fontWeightLight }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
VehicleFeature.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  large: PropTypes.bool,
};
