import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { rdxClearFilter } from 'src/redux/slices/products';

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
        borderRight: 'dashed 1px #333',
        pr: 5,
      }}
    >
      <Block title="Search By Part Info">
        <FilterBrand />
      </Block>

      <Block
        title="Filter Results By Category"
        sx={{
          visibility: isDisabled ? 'hidden' : 'visible',
          opacity: isDisabled ? 0 : 1,
          height: isDisabled ? 0 : 1,
          transition: 'height visibility 0.5s ease-out, opacity 0.5s ease-out',
        }}
      >
        <FilterCategory />
      </Block>

      {!isBtnHidden && (
        <LoadingButton
          fullWidth
          color="secondary"
          size="large"
          variant="contained"
          startIcon={<Iconify icon="carbon:trash-can" />}
          onClick={handleClearAll}
        >
          Clear All
        </LoadingButton>
      )}
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
