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
import SparePartsList from 'src/sections/product/list/spare-prats-list';
import NoResultsReturned from 'src/sections/product/list/no-results-returned';
import { rdxSetProducts, rdxGetRecordsCount } from 'src/redux/slices/products';

import SparePartsViewFilters from '../product/filters/spare-parts-view-filters';

// ----------------------------------------------------------------------

const RECORDS_LIMIT = 24;
// ----------------------------------------------------------------------

export default function SparePartsView() {
  const mobileOpen = useBoolean();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    page,
    filteredProducts: productsData,
    filter,
    recordsCount,
    startAfterDocument,
    startAtDocument,
  } = useSelector((state) => state.products);
  const { fsGetProductsByPage, fsGetProductsDocumentsCount, fsWriteBatchPartsData } =
    useAuthContext();

  // ----------------------------------------------------------------------------
  // GET RECORDS DATA
  useEffect(() => {
    const getProducts = async () => {
      if (filter.partNo !== '' || filter.model !== '') {
        setLoading(true);
        dispatch(
          rdxSetProducts(
            await fsGetProductsByPage(startAfterDocument, startAtDocument, RECORDS_LIMIT, filter)
          )
        );
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fsGetProductsByPage, page, filter.partNo, filter.model, filter.partName]);
  // ----------------------------------------------------------------------------
  // GET RECORDS COUNT
  useEffect(() => {
    (async () => {
      if (filter.partNo !== '' || filter.model !== '') {
        dispatch(rdxGetRecordsCount(await fsGetProductsDocumentsCount(filter)));
      }
    })();
  }, [fsGetProductsDocumentsCount, filter, dispatch]);
  // ----------------------------------------------------------------------------

  // useEffect(() => {
  //   const fakeLoading = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     loading.onFalse();
  //   };
  //   fakeLoading();
  // }, [loading, filter]);

  const addParts = async () => fsWriteBatchPartsData();

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
        <Stack>
          <Typography variant="h1" id="scrollToHere">
            CATALOG
          </Typography>
          <Typography>
            Add Items to cart, send them to our sales team, get quote within 1 hour
          </Typography>
        </Stack>

        <Button onClick={addParts}>Add Parts</Button>

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
            products={[...productsData].sort((a, b) => a.id - b.id)}
            totalDocs={recordsCount}
            recordsLimit={RECORDS_LIMIT}
          />
        </Box>
      </Stack>
    </Container>
  );
}
