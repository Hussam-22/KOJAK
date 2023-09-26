import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Fab, Card, Link, Stack } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function EcommerceProductViewListItem({ product, ...other }) {
  const { fsGetImgDownloadUrl } = useAuthContext();
  const [imgUrl, setImageUrl] = useState('');

  useEffect(() => {
    (async () => {
      setImageUrl(await fsGetImgDownloadUrl(product.imageName));
    })();
  }, [fsGetImgDownloadUrl, product.imageName]);

  return (
    <Card sx={{ p: 1, bgcolor: 'background.neutral' }}>
      <Stack
        direction="row"
        sx={{
          position: 'relative',
          '&:hover .add-to-cart': {
            opacity: 1,
          },
        }}
        {...other}
      >
        {/* {product.label === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.label === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, left: 0, zIndex: 9 }}>
          SALE
        </Label>
      )} */}

        <Fab
          component={RouterLink}
          href={paths.website.productDetails}
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            top: 8,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:shopping-cart-plus" />
        </Fab>

        <Image
          src={imgUrl}
          sx={{
            mr: 2,
            width: 160,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: 'background.neutral',
          }}
          ratio="4/3"
        />

        <Stack spacing={1}>
          <Stack spacing={0.5}>
            <TextMaxLine variant="caption" line={1} sx={{ color: 'text.disabled' }}>
              {product.itemID}
            </TextMaxLine>

            <Link component={RouterLink} href={paths.website.productDetails} color="inherit">
              <TextMaxLine variant="h6" line={1}>
                {product.description}
              </TextMaxLine>
            </Link>
          </Stack>

          <TextMaxLine variant="body2" line={1} sx={{ color: 'text.secondary' }}>
            {product.price} AED
          </TextMaxLine>
        </Stack>
      </Stack>
    </Card>
  );
}

EcommerceProductViewListItem.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    docID: PropTypes.string,
    id: PropTypes.number,
    itemGroup: PropTypes.string,
    itemID: PropTypes.any,
    price: PropTypes.number,
    imageName: PropTypes.string,
  }),
};
