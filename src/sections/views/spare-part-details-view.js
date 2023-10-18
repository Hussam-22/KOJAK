import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import TableContainer from '@mui/material/TableContainer';
import {
  Box,
  Paper,
  Stack,
  Button,
  Divider,
  useTheme,
  TableRow,
  Container,
  TableCell,
  Typography,
  IconButton,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Label from 'src/components/label/Label';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import SparePartsDetailsDescription from 'src/sections/product/details/spare-parts-details-description';

function SparePartDetailsView() {
  const { partDocID } = useParams();
  const [partDetails, setPartDetails] = useState({});
  const { fsGetPartDetails } = useAuthContext();

  const productDescription =
    (partDetails?.id &&
      `${partDetails.partName}, ${partDetails.category}, ` +
        `applicable for Mercedes Class: ${partDetails.brandClass.join(', ')}, ` +
        `and Mercedes Model: ${partDetails.brandModel.join(', ')}`) ||
    '';

  const getStockInfo = (qty) => {
    if (qty === 0) return { text: 'OUT OF STOCK', color: 'error' };
    if (qty > 0 && qty <= 10) return { text: 'LIMITED STOCK', color: 'warning' };
    return { text: 'AVAILABLE', color: 'success' };
  };

  useEffect(() => {
    (async () => {
      setPartDetails(await fsGetPartDetails(partDocID));
    })();
  }, [fsGetPartDetails, partDocID]);

  console.log(partDetails);

  const isInCart = false;
  const updateQty = () => {};

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Image
              src={partDetails.imgUrl}
              sx={{ borderRadius: 1 }}
              // ratio="1/1"
              alt={`${productDescription} - www.kojak-spare-parts.com`}
            />
          </Grid>
          <Grid md={6}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Label color={getStockInfo(partDetails.qty).color} sx={{ fontSize: '20px', p: 2 }}>
                {getStockInfo(partDetails.qty).text}
              </Label>
              <IconButton disableRipple>
                <Iconify
                  icon={isInCart ? 'ph:trash' : 'carbon:shopping-cart-plus'}
                  width={32}
                  height={32}
                  sx={{ color: 'primary.main' }}
                />
              </IconButton>

              <Stack direction="row" alignItems="center">
                <IconButton disableRipple onClick={() => updateQty(+1)}>
                  <Iconify
                    icon="bxs:up-arrow"
                    width={16}
                    height={16}
                    sx={{ color: 'secondary.main' }}
                  />
                </IconButton>
                <Typography>x 15</Typography>
                <IconButton disableRipple onClick={() => updateQty(-1)} disabled={0 === 1}>
                  <Iconify
                    icon="bxs:down-arrow"
                    width={16}
                    height={16}
                    sx={{ color: 'secondary.main' }}
                  />
                </IconButton>
              </Stack>
              <Button variant="outlined" color="primary">
                Get Quote via WhatsApp
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <SparePartsDetailsDescription
          productDescription={productDescription}
          partDetails={partDetails}
        />
      </Container>
    </Box>
  );
}
export default SparePartDetailsView;
// SparePartDetailsView.propTypes = { tables: PropTypes.array };
