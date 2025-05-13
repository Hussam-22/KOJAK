import PropTypes from 'prop-types';

import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';

import { useEffect } from 'react';
import Label from 'src/components/label';
import SparePartsDetailsActionButtons from 'src/sections/product/details/spare-parts-details-action-buttons';

function SparePartsDetailsInformation({ partDetails, productDescription }) {
  const theme = useTheme();

  const getStockInfo = (qty) => {
    if (qty === 0) return { text: 'OUT OF STOCK', color: 'error' };
    if (qty > 0 && qty <= 10) return { text: 'LIMITED STOCK', color: 'warning' };
    return { text: 'AVAILABLE', color: 'success' };
  };

  const applicableModels = `${partDetails.brandClass} - ${partDetails.brandModel}`;

  console.log(partDetails);

  useEffect(() => {
    if (partDetails?.id)
      window.fbq('track', 'ViewContent', {
        product_name: partDetails.partNumber,
        content_ids: [partDetails.partNumber],
        content_type: 'product',
        value: 0.0,
        currency: 'AED',
      });
  }, [partDetails]);

  return (
    partDetails?.docID && (
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Box>
            <Label
              color={getStockInfo(+partDetails.stock).color}
              sx={{ fontSize: 14, p: 1, fontWeight: theme.typography.fontWeightMedium }}
            >
              {getStockInfo(+partDetails.stock).text}
            </Label>
          </Box>
          <SparePartsDetailsActionButtons partDetails={partDetails} />
        </Stack>
        <Stack direction="column" spacing={1} justifyContent="space-between">
          <Typography variant="h4">{partDetails.partName}</Typography>
          <Typography variant="caption">{productDescription}</Typography>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed', my: 2, borderColor: theme.palette.divider }} />

        <Stack direction="column" spacing={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <Block title="Applicable Model(s)" description={applicableModels} />
          <Block title="Category" description={partDetails.category} />
          <Block title="Part Group" description={partDetails.itemGroup} />
          <Block title="Part Number/OEM" description={partDetails.partNumber} />
          <Block title="ID" description={partDetails.docID} />
        </Stack>
        <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
      </Box>
    )
  );
}
export default SparePartsDetailsInformation;

SparePartsDetailsInformation.propTypes = {
  partDetails: PropTypes.object,
  productDescription: PropTypes.string,
};

// ----------------------------------------------------------------------------

function Block({ title, description }) {
  return (
    <Stack spacing={0}>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Stack>
  );
}
Block.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.any]),
};
