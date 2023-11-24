import PropTypes from 'prop-types';

import { useTheme, Typography } from '@mui/material';

function VehicleDetailsInfo({ vehicleInfo }) {
  const vehicleFeatures = Object.values(vehicleInfo?.features || {});
  const theme = useTheme();

  return (
    <table cellSpacing={10}>
      <tbody>
        {vehicleFeatures
          .filter((item) => Array.isArray(item))
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map((item) => (
            <tr key={item[0]}>
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
      </tbody>
    </table>
  );
}
export default VehicleDetailsInfo;
VehicleDetailsInfo.propTypes = { vehicleInfo: PropTypes.object };
