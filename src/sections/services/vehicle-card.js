import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { Box, Card, Stack, Button, Divider, useTheme, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';
import Label from 'src/components/label/Label';
import { useAuthContext } from 'src/auth/hooks';
import { fNumber } from 'src/utils/format-number';
import Iconify from 'src/components/iconify/Iconify';
import TextMaxLine from 'src/components/text-max-line/text-max-line';

function VehicleCard({ vehicleInfo }) {
  const { brand, model, features, id, isFeatured, qty } = vehicleInfo;
  const theme = useTheme();
  const { fsGetImgDownloadUrl } = useAuthContext();
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setImageURL(await fsGetImgDownloadUrl(id, 0));
    })();
  }, [fsGetImgDownloadUrl, id]);

  return (
    <Card
      sx={{
        borderRadius: 1,
        position: 'relative',
      }}
    >
      {isFeatured && (
        <Label
          variant="filled"
          color="warning"
          sx={{ position: 'absolute', top: 15, left: 15, zIndex: 9 }}
          endIcon={<Iconify icon="ic:round-star" />}
        >
          Featured
        </Label>
      )}
      <Image src={imageURL} ratio="6/4" />
      <Stack sx={{ p: 3 }} spacing={2}>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
          <Box>
            <Typography variant="caption">{brand}</Typography>
            <TextMaxLine variant="h4" line={1}>
              {model}
            </TextMaxLine>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(paths.website.servicesDetails + id)}
            >
              More Details
            </Button>
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          divider={
            <Divider
              orientation="vertical"
              sx={{ borderStyle: 'dashed', borderWidth: 1 }}
              flexItem
            />
          }
          justifyContent="space-evenly"
          sx={{ borderTop: `dashed 1px ${theme.palette.divider}`, pt: 1 }}
        >
          <VehicleFeature icon="iwwa:year" value={features.year[1]} />
          <VehicleFeature icon="tdesign:money" value={features.price[1]} />
          <VehicleFeature icon="fa-solid:road" value={`${fNumber(features.milage[1])} Km`} />
          <VehicleFeature icon="ph:engine" value={features.engineType[1]} />
        </Stack>
      </Stack>
    </Card>
  );
}
export default VehicleCard;
VehicleCard.propTypes = { vehicleInfo: PropTypes.object };

// ----------------------------------------------------------------------------
function VehicleFeature({ icon, value }) {
  const theme = useTheme();
  return (
    <Stack justifyContent="center" alignItems="center" spacing={1}>
      <Iconify icon={icon} width={24} height={24} />
      <Typography variant="body2" sx={{ fontWeight: theme.typography.fontWeightLight }}>
        {value}
      </Typography>
    </Stack>
  );
}
VehicleFeature.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
