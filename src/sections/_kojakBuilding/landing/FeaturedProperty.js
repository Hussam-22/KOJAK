import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { memo, useState, useEffect } from 'react';

import { useTheme } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Box, Stack, Button, Divider } from '@mui/material';

import Image from 'src/components/image';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import PropertyDetailsHeader from 'src/sections/_kojakBuilding/properties/details/property-details-header';
import PropertyDetailsSummary from 'src/sections/_kojakBuilding/properties/details/property-details-summary';

function FeaturedProperty({ spaceInfo }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMdUp = useResponsive('up', 'md');
  const { fsGetFeaturedProperty, fsGetFolderImages } = useAuthContext();
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      if (spaceInfo?.docID) setImages(await fsGetFolderImages(spaceInfo.docID));
    })();
  }, [spaceInfo?.docID, fsGetFolderImages]);

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: { md: 5, xs: 2 },
        boxShadow: `-10px 10px 0 0 ${theme.palette.primary.main}`,
        border: `solid 2px ${theme.palette.common.black}`,
        bgcolor: 'background.default',
      }}
    >
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        textAlign={{ md: 'unset', xs: 'center' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h2">
          Hot Deal Property
          <Iconify icon="noto:fire" width={54} />
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/properties/${spaceInfo?.docID}`)}
        >
          View Property
        </Button>
      </Stack>
      <Image src={images[0]} alt={spaceInfo.description} sx={{ borderRadius: 1 }} />
      {/* {images.length !== 0 && <PropertyDetailsGallery images={images} />} */}
      {spaceInfo?.docID && <PropertyDetailsHeader spaceInfo={spaceInfo} />}

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      {spaceInfo?.docID && <PropertyDetailsSummary spaceInfo={spaceInfo} hideSummery />}
    </Box>
  );
}

export default memo(FeaturedProperty);

FeaturedProperty.propTypes = {
  spaceInfo: PropTypes.object,
};
