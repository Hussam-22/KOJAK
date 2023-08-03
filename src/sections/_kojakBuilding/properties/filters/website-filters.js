import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';
import { rdxSetFilter, rdxClearFilter } from 'src/redux/slices/properties';

import FilterType from './filter-type';

// ----------------------------------------------------------------------

export default function WebsiteFilters({ open, onClose }) {
  const mdUp = useResponsive('up', 'md');
  const { rdxFilter, filterDefaultValues } = useSelector((state) => state.properties);
  const dispatch = useDispatch();

  const clearFilter = () => {
    dispatch(rdxClearFilter());
  };

  const handleChangeType = useCallback(
    (event, key) => {
      const {
        target: { value },
      } = event;
      dispatch(
        rdxSetFilter({
          ...rdxFilter,
          [key]: typeof value === 'string' ? value.split(',') : value,
        })
      );
    },
    [rdxFilter, dispatch]
  );

  const renderContent = (
    <Stack
      spacing={2.5}
      sx={
        {
          // flexShrink: 0,
          // width: { xs: 1, md: 280 },
        }
      }
    >
      <Block title="Property Type">
        <FilterType
          filterType={rdxFilter.type}
          onChangeType={(e) => handleChangeType(e, 'type')}
          filters={filterDefaultValues.type}
          selectedAllText="All Types"
        />
      </Block>

      <Block title="Space/Room Options">
        <FilterType
          filterType={rdxFilter.city}
          onChangeType={(e) => handleChangeType(e, 'city')}
          filters={filterDefaultValues.city}
          selectedAllText="All Cities"
        />
      </Block>

      <Block title="Space/Room Options">
        <FilterType
          filterType={rdxFilter.bedrooms}
          onChangeType={(e) => handleChangeType(e, 'bedrooms')}
          filters={filterDefaultValues.bedrooms}
          selectedAllText="All Space/Room Options"
        />
      </Block>

      <Block title="Space/Room Availability">
        <FilterType
          filterType={rdxFilter.isAvailable}
          onChangeType={(e) => handleChangeType(e, 'isAvailable')}
          filters={filterDefaultValues.isAvailable}
          selectedAllText="All Space/Room"
        />
      </Block>

      <Button variant="contained" onClick={clearFilter}>
        Clear Filter
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
              pt: 5,
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

WebsiteFilters.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

function Block({ title, children }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="overline" sx={{ color: 'text.disabled' }}>
        {title}
      </Typography>

      {children}
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
