import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import { rdxClearFilter } from 'src/redux/slices/products';

import FilterBrand from './filter-brand';
import FilterCategory from './filter-category';
import FilterPartInfo from './filter-partInfo';

export default function EcommerceFilters({ open, onClose }) {
  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();

  const handleClearAll = () => dispatch(rdxClearFilter());

  const renderContent = (
    <Stack
      spacing={3}
      alignItems="flex-start"
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 280 },
      }}
    >
      <Block title="Part Info">
        <FilterPartInfo />
      </Block>

      <Block title="Brand">
        <FilterBrand />
      </Block>

      <Block title="Category">
        <FilterCategory />
      </Block>

      <Button
        fullWidth
        color="primary"
        size="large"
        variant="contained"
        startIcon={<Iconify icon="carbon:trash-can" />}
        onClick={handleClearAll}
      >
        Clear All
      </Button>
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

EcommerceFilters.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

function Block({ title, children, ...other }) {
  const contentOpen = useBoolean(true);

  return (
    <Stack spacing={2} alignItems="flex-start" sx={{ width: 1 }}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ width: 1 }}>{children}</Box>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
