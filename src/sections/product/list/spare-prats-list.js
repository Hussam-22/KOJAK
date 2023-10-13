import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack, Button, Typography } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useSelector } from 'src/redux/store';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { rdxUpdatePage, rdxUpdateCart } from 'src/redux/slices/products';
import NoResultsReturned from 'src/sections/product/list/no-results-returned';

import SparePartsListViewGridItem from '../item/spare-parts-list-view-grid-item';
import SparePartsListViewGridItemSkeleton from '../item/spare-parts-list-view-grid-item-skeleton';

// ----------------------------------------------------------------------

export default function SparePartsList({ loading, products, totalDocs, recordsLimit }) {
  const dispatch = useDispatch();
  const [localStorageCart, SetLocalStorageCart] = useLocalStorage('cart', []);
  const navigate = useNavigate();
  const { page: CurrentPage, filter } = useSelector((state) => state.products);

  const pagesCount = useMemo(() => Math.ceil(totalDocs / recordsLimit), [recordsLimit, totalDocs]);

  const noFilterApplied =
    JSON.stringify(Object.values(filter)) === JSON.stringify(['', '', '', '', Array(0)]);

  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: 'smooth',
    });
  }, [CurrentPage]);

  const handlePageChange = (event, page) => {
    dispatch(rdxUpdatePage(page));
  };

  // Function to update the cart and localStorage
  const onClickCartHandler = (partNumber) => {
    if (localStorageCart.some((storageItem) => storageItem.partNumber === partNumber)) {
      SetLocalStorageCart((prevState) =>
        prevState.filter((item) => item.partNumber !== partNumber)
      );
    }
    if (!localStorageCart.some((storageItem) => storageItem.partNumber === partNumber))
      SetLocalStorageCart((prevState) => [...prevState, { partNumber, qty: 1 }]);

    dispatch(rdxUpdateCart({ partNumber, qty: 1 }));
  };

  const renderView = () => {
    if (products.length === 0 && noFilterApplied) {
      return (
        <NoResultsReturned
          text="Use the search fields to find spare parts"
          illustration="/assets/illustrations/search.svg"
        />
      );
    }

    if (products.length === 0 && !noFilterApplied && !loading) {
      return (
        <>
          <NoResultsReturned
            text="No Spare Parts Where Found !!"
            illustration="/assets/illustrations/no-results.svg"
            color="secondary.main"
          />
          <Stack spacing={2} sx={{ textAlign: 'center' }}>
            <Typography>
              Did not find what you are looking for ?, contact us to arrange the part for you !!
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(paths.website.contactUs)}
              >
                Contact Us
              </Button>
            </Box>
          </Stack>
        </>
      );
    }

    return (
      <>
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
        >
          {(loading ? [...Array(16)] : products).map((product, index) =>
            product ? (
              <SparePartsListViewGridItem
                key={product.docID}
                product={product}
                onClickCartHandler={onClickCartHandler}
                localStorageCart={localStorageCart}
              />
            ) : (
              <SparePartsListViewGridItemSkeleton key={index} />
            )
          )}
        </Box>

        <Pagination
          onChange={handlePageChange}
          count={pagesCount}
          color="primary"
          sx={{
            mt: 10,
            mb: 5,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      </>
    );
  };

  return renderView();
}

SparePartsList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
  totalDocs: PropTypes.number,
  recordsLimit: PropTypes.number,
};
