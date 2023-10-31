import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import FilterBrand from './filter-brand';

export default function SparePartsViewFilters({ open, onClose }) {
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack spacing={2} alignItems="flex-start" direction={{ xs: 'column', md: 'row' }}>
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
              bgcolor: 'background.default',
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
