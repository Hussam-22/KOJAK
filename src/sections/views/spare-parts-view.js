import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Divider, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import InquirySteps from 'src/sections/product/item/inquiry-steps';
import SparePartsList from 'src/sections/product/list/spare-prats-list';
import { rdxSetProducts, rdxGetRecordsCount } from 'src/redux/slices/products';

import SparePartsViewFilters from '../product/filters/spare-parts-view-filters';

// ----------------------------------------------------------------------

const RECORDS_LIMIT = 25;
// ----------------------------------------------------------------------

export default function SparePartsView() {
  const mdUp = useResponsive('up', 'md');
  const mobileOpen = useBoolean();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
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
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Stack direction="column" alignItems="left" justifyContent="space-between">
        <Stack sx={{ mb: 2 }}>
          <Typography variant="h1" id="scrollToHere">
            CATALOG
          </Typography>
          {mdUp && <InquirySteps />}
        </Stack>

        {/* <Button onClick={addParts}>Add Parts</Button> */}
        {!mdUp && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: 1, mb: 3 }}>
            <Button
              size="large"
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

      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <SparePartsViewFilters open={mobileOpen.value} onClose={mobileOpen.onFalse} />
        {/* <Divider sx={{ borderStyle: 'dashed', borderColor: theme.palette.divider }} /> */}
        <SparePartsList
          loading={loading}
          products={productsData}
          totalDocs={recordsCount}
          recordsLimit={RECORDS_LIMIT}
        />
      </Stack>
    </Container>
  );
}
