import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function VehicleDetailsInfo({ vehicleInfo }) {
  const vehicleFeatures = Object.values(vehicleInfo?.features || {});
  const theme = useTheme();

  return (
    <table cellSpacing={10}>
      {vehicleFeatures
        .filter((item) => Array.isArray(item))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map((item) => (
          <tr>
            <td>
              <Typography variant="h6">{item[0]}</Typography>
            </td>
            <td>
              <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                {item[1]}
              </Typography>
            </td>
          </tr>
        ))}
    </table>
  );
}
export default VehicleDetailsInfo;
VehicleDetailsInfo.propTypes = { vehicleInfo: PropTypes.object };
