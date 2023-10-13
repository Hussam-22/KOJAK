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
  TableRow,
  Container,
  TableCell,
  Typography,
  IconButton,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function SparePartDetailsView() {
  const { partDocID } = useParams();
  const [partDetails, setPartDetails] = useState({});
  const { fsGetPartDetails } = useAuthContext();

  useEffect(() => {
    (async () => {
      setPartDetails(await fsGetPartDetails(partDocID));
    })();
  }, [fsGetPartDetails, partDocID]);

  console.log(partDetails);

  const isInCart = false;
  const updateQty = (qty) => {};

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid md={4}>
            <Stack spacing={2}>
              <Image src={partDetails.imgUrl} sx={{ borderRadius: 1 }} ratio="6/4" />
              <Stack direction="row" spacing={2} justifyContent="space-between">
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
            </Stack>
          </Grid>
          <Grid md={8}>
            {partDetails?.id && (
              <TableContainer component={Paper} sx={{ p: 3 }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ width: '25%' }}>Description</TableCell>
                      <TableCell>
                        {`${partDetails.partName}, ${partDetails.category}, ` +
                          `applicable for Mercedes Class: ${partDetails.brandClass.join(', ')}, ` +
                          `and Mercedes Model: ${partDetails.brandModel.join(', ')}`}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>{partDetails.category}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Part Number</TableCell>
                      <TableCell>{partDetails.partName}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Mercedes Class:</TableCell>
                      <TableCell>{partDetails.brandClass.join(', ')}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Mercedes Model</TableCell>
                      <TableCell>{partDetails.brandModel.join(', ')}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Part Group</TableCell>
                      <TableCell>{partDetails.itemGroup}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Part Number</TableCell>
                      <TableCell>{partDetails.partNumber}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Part OEM</TableCell>
                      <TableCell>123456789</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Stock Available</TableCell>
                      <TableCell>
                        {partDetails.stock > 0 && (
                          <Typography sx={{ color: 'success.main' }}>AVAILABLE</Typography>
                        )}
                        {partDetails.stock === 0 && (
                          <Typography sx={{ color: 'error.main' }}>OUT OF STOCK</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>

          <Grid md={12} />
        </Grid>
      </Container>
    </Box>
  );
}
export default SparePartDetailsView;
// SparePartDetailsView.propTypes = { tables: PropTypes.array };
