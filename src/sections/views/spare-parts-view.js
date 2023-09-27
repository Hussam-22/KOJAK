import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { rdxSetProducts } from 'src/redux/slices/products';
import EcommerceProductList from 'src/sections/product/list/ecommerce-product-list';

import EcommerceFilters from '../product/filters/ecommerce-filters';

// ----------------------------------------------------------------------

const RECORDS_LIMIT = 25;
// ----------------------------------------------------------------------

export default function SparePartsView() {
  const mobileOpen = useBoolean();
  const loading = useBoolean(true);
  const dispatch = useDispatch();
  const param = useLocation();

  const [documentsCount, setDocumentsCount] = useState(1);

  const { page, filteredProducts: productsData, filter } = useSelector((state) => state.products);
  const { fsGetProductsByPage, fsGetProductsDocumentsCount } = useAuthContext();

  useEffect(() => {
    (async () => setDocumentsCount(await fsGetProductsDocumentsCount()))();
  }, [fsGetProductsDocumentsCount]);

  useEffect(() => {
    const getProducts = async () => {
      console.log('CALL PARTS FROM FIREBASE');
      dispatch(rdxSetProducts(await fsGetProductsByPage(page, RECORDS_LIMIT, filter)));
    };
    getProducts();
  }, [dispatch, fsGetProductsByPage, page, filter]);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h3" id="scrollToHere">
          Catalog
        </Typography>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{
            display: { md: 'none' },
          }}
        >
          Filters
        </Button>
      </Stack>

      <Stack
        direction={{
          xs: 'column-reverse',
          md: 'row',
        }}
        sx={{ mb: { xs: 8, md: 10 } }}
      >
        <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          <EcommerceFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${280}px)` },
          }}
        >
          <EcommerceProductList
            loading={loading.value}
            products={[...productsData].sort((a, b) => a.id - b.id)}
            totalDocs={documentsCount}
          />
        </Box>
      </Stack>
    </Container>
  );
}
