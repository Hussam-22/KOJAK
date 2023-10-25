import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Switch, FormControlLabel } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { DisplayTotal } from 'src/components/lightbox/Lightbox';
import { rdxClearFilter, rdxUpdateFilter } from 'src/redux/slices/products';

import FilterBrand from './filter-brand';
import FilterPartInfo from './filter-partInfo';
import FilterCategory from './filter-category';

export default function SparePartsViewFilters({ open, onClose }) {
  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);

  const isDisabled = filter.model === '' && filter.partNo === '';
  const isBtnHidden = filter.partNo === '' && filter.model === '' && filter.class === '';

  const handleClearAll = () => {
    dispatch(rdxClearFilter());
  };

  const renderContent = (
    <Stack
      spacing={3}
      alignItems="flex-start"
      sx={{
        // flexShrink: 0,
        height: 1,
        width: { xs: 1, md: 320 },
        borderRight: { md: 'dashed 1px #333' },
        pr: { md: 5 },
      }}
    >
      <Block title="Search By Part Info">
        <FilterBrand closeDrawer={onClose} />
      </Block>

      {/* <Block
        title="Filter Results By Category"
        sx={{
          visibility: isDisabled ? 'hidden' : 'visible',
          opacity: isDisabled ? 0 : 1,
          height: isDisabled ? 0 : 1,
          transition: 'height visibility 0.5s ease-out, opacity 0.5s ease-out',
        }}
      >
        <FilterCategory />
      </Block> */}
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              pt: 3,
              px: 3,
              width: 280,
              boxShadow: 0,
              bgcolor: 'common.black',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

SparePartsViewFilters.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

function Block({ title, children, sx }) {
  const contentOpen = useBoolean(true);

  return (
    <Stack spacing={2} alignItems="flex-start" sx={{ width: 1, ...sx }}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ width: 1 }}>{children}</Box>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  sx: PropTypes.object,
};
