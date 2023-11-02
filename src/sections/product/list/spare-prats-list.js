import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack, Button, Typography, IconButton } from '@mui/material';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
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
  const { currentPage, filter } = useSelector((state) => state.products);

  const pagesCount = useMemo(() => Math.ceil(totalDocs / recordsLimit), [recordsLimit, totalDocs]);

  const noFilterApplied =
    JSON.stringify(Object.values(filter)) === JSON.stringify(['', '', '', '']);

  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const startAfterDocument = products[products.length - 1]?.partNumber || undefined;

  const handlePreviousPageClick = () => dispatch(rdxUpdatePage({ page: currentPage - 1 }));
  const handleNextPageClick = () =>
    dispatch(rdxUpdatePage({ page: currentPage + 1, startAfterDocument }));

  // Function to update the cart and localStorage
  const addToCartOnClickHandler = (partNumber) => {
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
          text="Lets help you find the right part for your Mercedes"
          illustration="/assets/illustrations/search.svg"
          color="primary.main"
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
          rowGap={2}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1 }}
        >
          {(loading ? [...Array(16)] : products).map((product, index) =>
            product ? (
              <SparePartsListViewGridItem
                key={product.docID}
                product={product}
                addToCartOnClickHandler={addToCartOnClickHandler}
                localStorageCart={localStorageCart}
              />
            ) : (
              <SparePartsListViewGridItemSkeleton key={index} />
            )
          )}
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="primary"
            disableRipple
            onClick={handlePreviousPageClick}
            disabled={currentPage === 1}
            sx={{ typography: 'body1' }}
          >
            <Iconify icon="bxs:left-arrow" /> Previous
          </IconButton>

          <IconButton
            color="primary"
            disableRipple
            onClick={handleNextPageClick}
            disabled={currentPage === pagesCount}
            sx={{ typography: 'body1' }}
          >
            Next <Iconify icon="bxs:right-arrow" />
          </IconButton>
        </Box>
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
