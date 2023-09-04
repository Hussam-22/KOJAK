import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Box, Card, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function VehicleCard({ vehicleInfo }) {
  const { brand, model, features, id, isFeatured, qty } = vehicleInfo;
  const { fsGetImgDownloadUrl } = useAuthContext();
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    (async () => {
      setImageURL(await fsGetImgDownloadUrl(id, 1));
    })();
  }, [fsGetImgDownloadUrl, id]);

  return (
    <Card sx={{ p: 2 }}>
      <Image src={imageURL} />
      <Stack>
        <Typography>{brand}</Typography>
        <Typography>{model}</Typography>
      </Stack>
    </Card>
  );
}
export default VehicleCard;
VehicleCard.propTypes = { vehicleInfo: PropTypes.object };
