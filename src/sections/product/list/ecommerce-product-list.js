import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useMemo, useEffect } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { useSelector } from 'src/redux/store';
import { rdxUpdatePage } from 'src/redux/slices/products';

import EcommerceProductViewGridItem from '../item/ecommerce-product-view-grid-item';
import EcommerceProductViewGridItemSkeleton from '../item/ecommerce-product-view-grid-item-skeleton';

// ----------------------------------------------------------------------

export default function EcommerceProductList({ loading, products, totalDocs }) {
  const dispatch = useDispatch();
  const { page: CurrentPage, filter } = useSelector((state) => state.products);

  const pages = useMemo(() => Math.ceil(totalDocs / 25), [totalDocs]);

  useEffect(() => {
    window.scrollTo({
      top: 10,
      behavior: 'smooth',
    });
  }, [CurrentPage]);

  const handlePageChange = (event, page) => {
    dispatch(rdxUpdatePage(page));
  };

  return (
    <>
      <Box
        rowGap={4}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {(loading ? [...Array(16)] : products).map((product, index) =>
          product ? (
            <EcommerceProductViewGridItem key={product.docID} product={product} />
          ) : (
            <EcommerceProductViewGridItemSkeleton key={index} />
          )
        )}
      </Box>

      <Pagination
        onChange={handlePageChange}
        count={pages}
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
}

EcommerceProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
  totalDocs: PropTypes.number,
};
