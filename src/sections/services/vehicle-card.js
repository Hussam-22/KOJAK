import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { Link, Card, Stack, Divider, useTheme, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { fNumber } from 'src/utils/format-number';
import { useResponsive } from 'src/hooks/use-responsive';
import TextMaxLine from 'src/components/text-max-line/text-max-line';
import VehicleFeature from 'src/sections/services/components/vehicle-feature';

function VehicleCard({ vehicleInfo }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const { brand, model, year, price, engineType, milage, id, isFeatured, qty } = vehicleInfo;
  const { fsGetImgDownloadUrl } = useAuthContext();
  const [imageURL, setImageURL] = useState(null);
  const { translate } = useLocales();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setImageURL(await fsGetImgDownloadUrl('kojak-exclusive', id, 0));
    })();
  }, [fsGetImgDownloadUrl, id]);

  return (
    <Card
      sx={{
        borderRadius: 1,
        position: 'relative',
      }}
    >
      <Image src={imageURL || '/assets/images/no_preview.jpg'} ratio="6/4" />

      <Stack sx={{ p: 3 }} spacing={2}>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
          <Link
            // component={RouterLink}
            // href={paths.website.servicesDetails + id}
            // underline="none"
            sx={{ color: 'secondary.main' }}
          >
            <Typography variant="caption">{translate(`common.${brand.toLowerCase()}`)}</Typography>

            <TextMaxLine variant="h4" line={1}>
              {model}
            </TextMaxLine>
          </Link>
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
          <VehicleFeature icon="iwwa:year" value={year} />
          <VehicleFeature icon="tdesign:money" value={price} />
          <VehicleFeature icon="fa-solid:road" value={`${fNumber(milage)} Km`} />
          {mdUp && <VehicleFeature icon="ph:engine" value={engineType} />}
        </Stack>
      </Stack>
    </Card>
  );
}
export default VehicleCard;

VehicleCard.propTypes = { vehicleInfo: PropTypes.object };
