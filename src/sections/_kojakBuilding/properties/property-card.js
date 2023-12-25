import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Label from 'src/components/label';
import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import { fNumber } from 'src/utils/format-number';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line/text-max-line';

// ----------------------------------------------------------------------

export default function PropertyCard({ space, vertical }) {
  const {
    acType,
    bathrooms,
    bedrooms,
    city,
    description,
    docID,
    isActive,
    isCommercial,
    isFeatured,
    kitchens,
    location,
    rent,
    rentSale,
    spaceType,
    totalArea,
  } = space.data;
  const navigate = useNavigate();
  const { translate, currentLang } = useLocales();
  const theme = useTheme();

  // const descriptionValue = currentLang.value === 'ar' ? descriptionAr?.ar || '' : description;
  const descriptionValue = description;

  const openSpaceCard = () => {
    navigate(paths.website.propertyDetails + docID);
  };

  const finalRent = rentSale || rent;

  return (
    <Card
      sx={{
        display: { sm: 'flex' },
        ...(vertical && {
          flexDirection: 'column',
        }),
        borderRadius: 1,
        textDecoration: 'none',
        position: 'relative',
        border: isFeatured && `solid 2px ${theme.palette.primary.main}`,
        boxShadow: `4px 4px 0 0 ${
          isFeatured ? theme.palette.primary.main : theme.palette.common.black
        }`,
      }}
      component={RouterLink}
      href={paths.website.propertyDetails + docID}
    >
      {isFeatured && isActive && (
        <Label variant="outlined" color="info" sx={{ position: 'absolute', top: 10, right: 10 }}>
          Featured
        </Label>
      )}

      {!isActive && (
        <Label variant="outlined" sx={{ position: 'absolute', top: 10, right: 10 }}>
          Not Available
        </Label>
      )}

      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Image
          alt={`Kojak - ${description}`}
          src={
            space.thumbnail === undefined
              ? '/assets/kojak-building/no_preview.jpg'
              : space.thumbnail
          }
          ratio="4/3"
          sx={{
            height: 1,
            objectFit: 'cover',
            width: { sm: 240, xs: 1 },
            ...(vertical && {
              width: { xs: 1 },
            }),
            filter: !isActive && 'grayscale(1)',
          }}
        />
      </Box>

      <Stack
        spacing={1}
        direction="column"
        sx={{ p: 3 }}
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        <Box>
          <IconWithText
            icon="ion:location-outline"
            text={`${translate(`propertyCard.${city.toLowerCase()}`)} - ${location}`}
          />
        </Box>
        {isActive && (
          <Typography variant="h3" sx={{ color: isActive ? 'primary.main' : 'text.disabled' }}>
            {finalRent.length > 7
              ? `${translate('common.aed')}${finalRent}`
              : `${translate('common.aed')} ${fNumber(finalRent)}`}
          </Typography>
        )}
        <Typography sx={{ color: 'text.disabled' }}>
          {`${translate(`propertyCard.${spaceType.toLowerCase().replaceAll(' ', '')}`)} - ${
            isCommercial ? 'Commercial' : 'Residential'
          }`}
        </Typography>

        <TextMaxLine line={1} variant="h5">
          {descriptionValue === '' ? translate('propertyCard.noDesc') : descriptionValue}
        </TextMaxLine>

        <Stack
          direction="row"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ alignItems: 'center' }}
        >
          <Typography>
            <Iconify icon="tabler:ruler-measure" width={14} sx={{ mx: 1 }} />
            {totalArea}
          </Typography>

          {bedrooms !== 0 && <IconWithText icon="fluent:bed-24-regular" text={bedrooms} />}
          {bathrooms !== 0 && <IconWithText icon="cil:shower" text={bathrooms} />}
          {/* {kitchens !== 0 && <IconWithText icon="tabler:tools-kitchen-2" text={kitchens} />} */}
          <IconWithText icon="iconoir:air-conditioner" text={acType} />
        </Stack>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
      </Stack>
    </Card>
  );
}

PropertyCard.propTypes = {
  vertical: PropTypes.bool,
  space: PropTypes.shape({
    thumbnail: PropTypes.string,
    data: PropTypes.shape({
      acType: PropTypes.string,
      bathrooms: PropTypes.number,
      bedrooms: PropTypes.number,
      cctv: PropTypes.bool,
      city: PropTypes.string,
      description: PropTypes.string,
      docID: PropTypes.string,
      healthClub: PropTypes.bool,
      isActive: PropTypes.bool,
      isCommercial: PropTypes.bool,
      isFeatured: PropTypes.bool,
      kitchens: PropTypes.number,
      location: PropTypes.string,
      parking: PropTypes.bool,
      paymentTerms: PropTypes.string,
      rent: PropTypes.number,
      rentSale: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      security: PropTypes.bool,
      spaceType: PropTypes.string,
      totalArea: PropTypes.string,
    }),
  }),
};

// ----------------------------------------------------------------------------
function IconWithText({ icon, text }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <Iconify icon={icon} />
      <Typography>{text}</Typography>
    </Stack>
  );
}

IconWithText.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
