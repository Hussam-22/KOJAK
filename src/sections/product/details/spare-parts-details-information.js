import PropTypes from 'prop-types';

import { Box, Stack, Divider, useTheme, Typography, IconButton } from '@mui/material';

import Label from 'src/components/label';
import { _mercedesClasses } from 'src/_mock';
import Iconify from 'src/components/iconify';
import SparePartsDetailsActionButtons from 'src/sections/product/details/spare-parts-details-action-buttons';

function SparePartsDetailsInformation({ partDetails, productDescription }) {
  const theme = useTheme();

  const getStockInfo = (qty) => {
    if (qty === 0) return { text: 'OUT OF STOCK', color: 'error' };
    if (qty > 0 && qty <= 10) return { text: 'LIMITED STOCK', color: 'warning' };
    return { text: 'AVAILABLE', color: 'success' };
  };

  const filteredClasses =
    _mercedesClasses.filter((vehicle) => partDetails?.brandClass?.includes(vehicle.class)) || {};

  // const applicableModels = filteredClasses.map((item) => (
  //   <Typography key={item.class} sx={{ fontWeight: theme.typography.fontWeightLight }}>
  //     <Box component="span" sx={{ color: 'info.main' }}>
  //       {item.class}
  //     </Box>{' '}
  //     -{' '}
  //     {item.models
  //       .filter((model) => partDetails.brandModel.slice(0, 4).includes(model.model))
  //       .map((modelItem) => `(${modelItem.model}) ${modelItem.productionYears}`)
  //       .join(', ')}
  //   </Typography>
  // ));

  const applicableModels = filteredClasses.map((item) => (
    <Typography key={item.class} sx={{ fontWeight: theme.typography.fontWeightLight }}>
      <Box component="span" sx={{ color: 'info.main' }}>
        {item.class}
      </Box>{' '}
      - {partDetails.brandModel.join(', ')}
    </Typography>
  ));

  return (
    partDetails?.id && (
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Box>
            <Label
              color={getStockInfo(partDetails.stock).color}
              sx={{ fontSize: 14, p: 1, fontWeight: theme.typography.fontWeightMedium }}
            >
              {getStockInfo(partDetails.stock).text}
            </Label>
          </Box>
          <SparePartsDetailsActionButtons partDetails={partDetails} />
        </Stack>
        <Stack direction="column" spacing={1} justifyContent="space-between">
          <Typography variant="h4">{partDetails.partName}</Typography>
          <Typography variant="caption">{productDescription}</Typography>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

        <Stack direction="column" spacing={1} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <Stack spacing={0}>
            <Typography color="secondary">Applicable Model(s)</Typography>
            {applicableModels}
          </Stack>
          <Block title="Category" description={partDetails.category} />
          <Block title="Part Group" description={partDetails.itemGroup} />
          <Block title="Part Number/OEM" description={partDetails.partNumber} />
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
  const theme = useTheme();
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
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
