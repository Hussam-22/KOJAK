import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Link, Stack, Divider, Container, Typography, Breadcrumbs } from '@mui/material';

import { paths } from 'src/routes/paths';
import { PAGE_VISIT } from 'src/config-global';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import SideDrawer from 'src/components/drawer/side-drawer';
import { rdxToggleDrawer } from 'src/redux/slices/products';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';
import SparePartsDetailsInformation from 'src/sections/product/details/spare-parts-details-information';
import SparePartsDetailsActionButtons from 'src/sections/product/details/spare-parts-details-action-buttons';

function SparePartDetailsView() {
  const dispatch = useDispatch();
  const { partDocID } = useParams();
  const [partDetails, setPartDetails] = useState({});
  const { fsGetPartDetails, fsUpdatePartStatistics } = useAuthContext();
  const { isDrawerOpen } = useSelector((state) => state.products);

  const onDrawerCloseHandler = () => dispatch(rdxToggleDrawer());

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

  useEffect(() => {
    (async () => {
      if (partDetails.docID) await fsUpdatePartStatistics(partDetails.docID, PAGE_VISIT);
    })();
  }, [fsUpdatePartStatistics, partDetails]);

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, px: 1 }}>
          <Link
            component={RouterLink}
            href={paths.website.spareParts}
            underline="hover"
            color="info"
          >
            Spare Parts List
          </Link>
          <Typography>{partDetails?.partNumber}</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
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
                src={
                  partDetails.imgUrl === undefined
                    ? '/assets/illustrations/part-unavailable.svg'
                    : partDetails.imgUrl
                }
                sx={{ borderRadius: 1 }}
                // ratio="1/1"
                alt={`${productDescription} - www.kojak-spare-parts.com`}
              />
            </Box>
          </Grid>
          <Grid md={6} xs={12}>
            <SparePartsDetailsInformation
              productDescription={productDescription}
              partDetails={partDetails}
            />
          </Grid>
        </Grid>
      </Container>
      <SideDrawer open={isDrawerOpen} onClose={onDrawerCloseHandler}>
        <Typography variant="h4">Lets try to get you this spare-part</Typography>
        <Typography variant="caption">
          Once you submit the request, One of our customer success will contact you shortly
        </Typography>
        <Divider sx={{ borderStyle: 'dashed', my: 2 }} />
        <ContactUsForm />
      </SideDrawer>
    </Box>
  );
}
export default SparePartDetailsView;
// SparePartDetailsView.propTypes = { tables: PropTypes.array };
