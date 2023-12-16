import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Divider, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';
import SideDrawer from 'src/components/drawer/side-drawer';
import { rdxToggleDrawer } from 'src/redux/slices/products';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import SparePartsDetailsInformation from 'src/sections/product/details/spare-parts-details-information';

function SparePartDetailsView({ partDetails, productDescription }) {
  const dispatch = useDispatch();
  const { isDrawerOpen } = useSelector((state) => state.products);

  const onDrawerCloseHandler = () => dispatch(rdxToggleDrawer());

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          links={[
            { name: 'Spare Parts List', href: paths.website.spareParts },
            { name: partDetails?.partNumber },
          ]}
          sx={{ my: 1, px: 1 }}
        />
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
                alt={`${productDescription} - www.kojak-spareparts.com`}
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

SparePartDetailsView.propTypes = {
  partDetails: PropTypes.object,
  productDescription: PropTypes.string,
};
