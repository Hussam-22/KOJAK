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
import SparePartsDetailsInformation from 'src/sections/product/details/spare-parts-details-information';
import SparePartsDetailsActionButtons from 'src/sections/product/details/spare-parts-details-action-buttons';

function SparePartDetailsView() {
  const { partDocID } = useParams();
  const [partDetails, setPartDetails] = useState({});
  const { fsGetPartDetails } = useAuthContext();

  const productDescription =
    (partDetails?.id &&
      `${partDetails.description}, ${partDetails.category}, ` +
        `applicable for Mercedes Class: ${partDetails.brandClass.join(', ')}, ` +
        `and Mercedes Model: ${partDetails.brandModel.join(', ')}`) ||
    '';

  useEffect(() => {
    (async () => {
      setPartDetails(await fsGetPartDetails(partDocID));
    })();
  }, [fsGetPartDetails, partDocID]);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
                p: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                src={partDetails.imgUrl}
                sx={{ borderRadius: 1 }}
                // ratio="1/1"
                alt={`${productDescription} - www.kojak-spare-parts.com`}
              />
            </Box>
          </Grid>
          <Grid md={6}>
            <Stack direction="column" justifyContent="space-between" sx={{ height: 1 }} spacing={2}>
              <SparePartsDetailsInformation
                productDescription={productDescription}
                partDetails={partDetails}
              />
              <SparePartsDetailsActionButtons partDetails={partDetails} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default SparePartDetailsView;
// SparePartDetailsView.propTypes = { tables: PropTypes.array };
