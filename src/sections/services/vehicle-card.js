import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import { Box, Link, Card, Stack, Button, Divider, useTheme, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useLocales } from 'src/locales';
import Label from 'src/components/label/Label';
import Image from 'src/components/image/Image';
import { fNumber } from 'src/utils/format-number';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import TextMaxLine from 'src/components/text-max-line/text-max-line';
import VehicleFeature from 'src/sections/services/components/vehicle-feature';

function VehicleCard({ vehicleInfo }) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const { brand, model, year, price, engineType, milage, docID, isFeatured } = vehicleInfo.data;
  const { translate, currentLang } = useLocales();

  const navigate = useNavigate();

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
          {translate('landing.spotLight.spotLight')}
        </Label>
      )}

      <Image src={vehicleInfo.thumbnail || '/assets/images/no_preview.jpg'} ratio="6/4" />

      <Stack sx={{ p: 3 }} spacing={2}>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
          <Box>
            <Link
              component={RouterLink}
              href={paths(currentLang.value).website.servicesDetails + docID}
              // underline="none"
              sx={{ color: 'secondary.main' }}
            >
              <Typography variant="caption">
                {translate(`common.${brand.toLowerCase()}`)}
              </Typography>

              <TextMaxLine variant="h4" line={1}>
                {model}
              </TextMaxLine>
            </Link>
            {/* <Typography>{id}</Typography> */}
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(paths(currentLang.value).website.servicesDetails + docID)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {translate('common.moreDetails')}
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
