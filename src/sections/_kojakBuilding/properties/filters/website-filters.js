import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { rdxSetFilter } from 'src/redux/slices/properties';

import FilterType from './filter-type';
import FilterLevel from './filter-level';

// ----------------------------------------------------------------------

const filterValues = {
  type: ['residential', 'commercial'],
  bedrooms: [1, 2, 3, 'office space', 'studio'],
  bathrooms: [1, 2, 3],
  city: ['sharjah', 'dubai'],
  isAvailable: [true, false],
};

export default function WebsiteFilters({ open, onClose }) {
  const mdUp = useResponsive('up', 'md');
  const { rdxFilter, filterDefaultValues } = useSelector((state) => state.properties);
  const dispatch = useDispatch();

  const handleChangeRating = useCallback(
    (event) => {
      dispatch(
        rdxSetFilter({
          ...rdxFilter,
          filterRating: event.target.value,
        })
      );
    },
    [dispatch, rdxFilter]
  );

  const handleChangeCategory = useCallback(
    (newValue) => {
      dispatch(
        rdxSetFilter({
          ...rdxFilter,
          filterCategories: newValue,
        })
      );
    },
    [rdxFilter, dispatch]
  );

  // const handleChangeLevel = useCallback(
  //   (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setFilters({
  //       ...filters,
  //       filterLevel: typeof value === 'string' ? value.split(',') : value,
  //     });
  //   },
  //   [filters]
  // );

  // const handleChangeFee = useCallback(
  //   (event) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     setFilters({
  //       ...filters,
  //       filterFee: typeof value === 'string' ? value.split(',') : value,
  //     });
  //   },
  //   [filters]
  // );

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

  // const handleChangeLanguage = useCallback(
  //   (newValue) => {
  //     setFilters({
  //       ...filters,
  //       filterLanguage: newValue,
  //     });
  //   },
  //   [filters]
  // );

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

      {/* <Block title="Category">
        <FilterCategories
          filterCategories={filters.filterCategories}
          onChangeCategory={handleChangeCategory}
        />
      </Block>

      <Block title="Level">
        <FilterLevel filterLevel={filters.filterLevel} onChangeLevel={handleChangeLevel} />
      </Block>

      <Block title="Fee">
        <FilterFee filterFee={filters.filterFee} onChangeFee={handleChangeFee} />
      </Block>

      <Block title="Language">
        <FilterLanguage
          filterLanguage={filters.filterLanguage}
          onChangeLanguage={handleChangeLanguage}
        />
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
