import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Card, Typography } from '@mui/material';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function EcommerceProductViewGridItem({ product, sx, ...other }) {
  const { fsGetImgDownloadUrl } = useAuthContext();
  const [imgUrl, setImageUrl] = useState('');

  useEffect(() => {
    (async () => {
      setImageUrl(await fsGetImgDownloadUrl(product.imageName));
    })();
  }, [fsGetImgDownloadUrl, product.imageName]);

  return (
    <Card sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
      <Stack
        sx={{
          position: 'relative',
          '&:hover .add-to-cart': {
            opacity: 1,
          },
          ...sx,
        }}
        {...other}
      >
        {/* {product.label === 'new' && (
        <Label color="info" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          NEW
        </Label>
      )}

      {product.label === 'sale' && (
        <Label color="error" sx={{ position: 'absolute', m: 1, top: 0, right: 0, zIndex: 9 }}>
          SALE
        </Label>
      )} */}

        <Box sx={{ position: 'relative' }}>
          <Fab
            component={RouterLink}
            href={paths.website.productDetails}
            className="add-to-cart"
            color="primary"
            size="small"
            sx={{
              right: 8,
              zIndex: 9,
              bottom: 8,
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
              flexShrink: 0,
              borderRadius: '5px 5px 0 0',
              bgcolor: 'background.neutral',
            }}
            ratio="4/3"
          />
        </Box>

        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {product.id} - {product.partNumber}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {product.brandClass.join(' - ')}
          </Typography>
          <TextMaxLine variant="body1" line={1} color="primary">
            {product.partName}
          </TextMaxLine>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {product.category} - {product.subCategory}
          </Typography>
          <Link component={RouterLink} href={paths.website.productDetails} color="inherit">
            <TextMaxLine
              variant="body2"
              color="primary"
              line={1}
              sx={{ fontWeight: 'fontWeightMedium' }}
            >
              {product.description}
            </TextMaxLine>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}

EcommerceProductViewGridItem.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    docID: PropTypes.string,
    id: PropTypes.number,
    itemGroup: PropTypes.string,
    partNumber: PropTypes.any,
    partName: PropTypes.any,
    price: PropTypes.number,
    imageName: PropTypes.string,
    category: PropTypes.string,
    subCategory: PropTypes.string,
    brandModel: PropTypes.array,
    brandClass: PropTypes.array,
  }),
  sx: PropTypes.object,
};
