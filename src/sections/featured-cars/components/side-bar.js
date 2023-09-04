import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { alpha } from '@mui/system';
import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function SideBar({ featuredCars, selectedVehicleID }) {
  return (
    <Stack direction="column" spacing={2}>
      {featuredCars.map((car, index) => (
        <Stack direction="row" spacing={3} key={car.id} alignItems="center">
          <Thumbnail vehicleInfo={car} selectedVehicleID={selectedVehicleID} index={index} />
          <Typography variant="h4" color="secondary">
            {car.model}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
export default SideBar;
SideBar.propTypes = {
  selectedVehicleID: PropTypes.func,
  featuredCars: PropTypes.array,
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
