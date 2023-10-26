import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import SparePartsList from 'src/sections/product/list/spare-prats-list';
import { rdxSetProducts, rdxGetRecordsCount } from 'src/redux/slices/products';

import SparePartsViewFilters from '../product/filters/spare-parts-view-filters';

// ----------------------------------------------------------------------

const RECORDS_LIMIT = 24;
// ----------------------------------------------------------------------

export default function SparePartsView() {
  const mdUp = useResponsive('up', 'md');
  const mobileOpen = useBoolean();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const {
    currentPage,
    // filteredProducts: productsData,
    products: productsData,
    filter,
    recordsCount,
    startAfterDocument,
  } = useSelector((state) => state.products);
  const { fsGetProductsByPage, fsGetProductsDocumentsCount, fsWriteBatchPartsData } =
    useAuthContext();

  const addParts = async () => fsWriteBatchPartsData();

  // GET SPARE-PARTS DATA  ------------------------------------
  useEffect(() => {
    const getProducts = async () => {
      if (filter.partNo !== '' || filter.model !== '') {
        setLoading(true);
        dispatch(
          rdxSetProducts({
            page: currentPage,
            sparePartsData: await fsGetProductsByPage(
              startAfterDocument[currentPage - 1],
              RECORDS_LIMIT,
              filter
            ),
          })
        );
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    getProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fsGetProductsByPage, currentPage, filter.partNo, filter.model, filter.category]);

  // GET SPARE-PARTS COUNT ------------------------------------
  useEffect(() => {
    (async () => {
      if (filter.partNo !== '' || filter.model !== '') {
        dispatch(rdxGetRecordsCount(await fsGetProductsDocumentsCount(filter)));
      }
    })();
  }, [fsGetProductsDocumentsCount, filter, dispatch]);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Stack sx={{ mb: 2 }}>
          <Typography variant="h1" id="scrollToHere">
            CATALOG
          </Typography>
          <Typography>
            Add Items to cart, send them to our sales team, get quote within 1 hour
          </Typography>
        </Stack>

        {/* <Button onClick={addParts}>Add Parts</Button> */}
        {!mdUp && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: 1 }}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Iconify icon="carbon:filter" width={18} />}
              onClick={mobileOpen.onTrue}
            >
              Search & Filter
            </Button>
          </Box>
        )}
      </Stack>

      <Stack
        direction={{
          xs: 'column-reverse',
          md: 'row',
        }}
        sx={{ mb: { xs: 8, md: 10 } }}
      >
        <SparePartsViewFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />

        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 4 },
            width: { md: `calc(100% - ${300}px)` },
          }}
        >
          <SparePartsList
            loading={loading}
            products={productsData}
            totalDocs={recordsCount}
            recordsLimit={RECORDS_LIMIT}
          />
        </Box>
      </Stack>
    </Container>
  );
}
