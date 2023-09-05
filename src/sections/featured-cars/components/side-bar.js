import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { alpha } from '@mui/system';
import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function SideBar({ featuredCars, selectedVehicleID, selectedCarID }) {
  const theme = useTheme();
  const selectedStyle = {
    bgcolor: theme.palette.primary.main,
    p: 1,
    borderRadius: 1,
    transition: 'ease 0.55s',
  };
  return (
    <Stack direction="column" spacing={2}>
      {featuredCars.map((car, index) => (
        <Stack
          direction="row"
          spacing={3}
          key={car.id}
          alignItems="center"
          sx={{ p: 1, ...(selectedCarID === car.id && selectedStyle) }}
        >
          <Thumbnail vehicleInfo={car} selectedVehicleID={selectedVehicleID} index={index} />
          <Stack>
            <Typography
              variant="h6"
              sx={{ color: selectedCarID === car.id ? 'common.white' : 'common.black' }}
            >
              {car.brand}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: selectedCarID === car.id ? 'common.white' : 'common.black' }}
            >
              {car.model}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
export default SideBar;
SideBar.propTypes = {
  selectedVehicleID: PropTypes.func,
  featuredCars: PropTypes.array,
  selectedCarID: PropTypes.string,
};

function Thumbnail({ vehicleInfo, selectedVehicleID, index }) {
  const [url, setUrl] = useState('');
  const { fsGetImgDownloadUrl } = useAuthContext();

  useEffect(() => {
    (async () => {
      setUrl(await fsGetImgDownloadUrl(vehicleInfo.id, 0, true));
    })();
  }, [fsGetImgDownloadUrl, vehicleInfo.id]);

  return (
    url && (
      <Image
        src={url}
        height="8vh"
        width="8vw"
        sx={{ borderRadius: 1, cursor: 'pointer' }}
        onClick={() => selectedVehicleID(vehicleInfo.id)}
      />
    )
  );
}

Thumbnail.propTypes = {
  selectedVehicleID: PropTypes.func,
  vehicleInfo: PropTypes.object,
  index: PropTypes.number,
};
