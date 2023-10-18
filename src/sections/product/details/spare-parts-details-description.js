import PropTypes from 'prop-types';

import { Box, Stack, Button, Divider, useTheme, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function SparePartsDetailsDescription({ partDetails, productDescription }) {
  return (
    <Box sx={{ bgcolor: 'background.neutral', borderRadius: 1, mt: 3, p: 3 }}>
      {partDetails?.id && (
        <Stack direction="column" spacing={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <Block title="Description" description={productDescription} />
          <Block title="Part Name" description={partDetails.partName} />
          <Block title="Category" description={partDetails.category} />
          <Block
            title="Applicable Mercedes Class"
            description={partDetails.brandClass.join(', ')}
          />
          <Block
            title="Applicable Mercedes Model"
            description={partDetails.brandModel.join(', ')}
          />
          <Block title="Part Group" description={partDetails.itemGroup} />
          <Block title="Part Number/OEM" description={partDetails.partNumber} />
          <Stack>
            <Typography>Stock Available</Typography>
            {partDetails.stock > 0 && (
              <Typography sx={{ color: 'success.main' }}>AVAILABLE</Typography>
            )}
            {partDetails.stock === 0 && (
              <Typography sx={{ color: 'error.main' }}>OUT OF STOCK</Typography>
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
export default SparePartsDetailsDescription;

SparePartsDetailsDescription.propTypes = {
  partDetails: PropTypes.object,
  productDescription: PropTypes.string,
};

// ----------------------------------------------------------------------------

function Block({ title, description }) {
  const theme = useTheme();
  return (
    <Stack spacing={0}>
      <Typography color="secondary">{title}</Typography>
      <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>{description}</Typography>
    </Stack>
  );
}
Block.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
