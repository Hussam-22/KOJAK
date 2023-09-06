import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

import { Box, Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------------
export default function VehicleFeature({ icon, value, large, color }) {
  const theme = useTheme();
  const iconSize = large ? 32 : 24;
  const fontVariant = large ? 'h6' : 'body2';
  return (
    <Stack justifyContent="center" alignItems="center" spacing={1}>
      <Iconify icon={icon} width={iconSize} height={iconSize} />
      {!color && (
        <Typography
          variant={fontVariant}
          sx={{ fontWeight: large ? 'unset' : theme.typography.fontWeightLight }}
        >
          {value}
        </Typography>
      )}

      {color && (
        <Box
          sx={{
            bgcolor: value,
            borderRadius: '50%',
            border: 'solid 1px #000',
            width: iconSize - 12,
            height: iconSize - 12,
          }}
        />
      )}
    </Stack>
  );
}
VehicleFeature.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  large: PropTypes.bool,
  color: PropTypes.bool,
};
